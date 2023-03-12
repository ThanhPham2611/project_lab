import React from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";

//local
import { listDevices, listMajor } from "../../../utils";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";
import { post } from "../../../services/axios/baseAPI";
import moment from "moment";

// socket
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
});

const { TextArea } = Input;

const DeviceRegister = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (value) => {
    deviceRegister({
      ...value,
      studentCode: value.studentCode.toLowerCase()
    });
  };

  const postDeviceRegister = (data) => post(`deviceRegister`, data);

  const { mutate: deviceRegister, isLoading: isPostingInfo } = useMutation(
    postDeviceRegister,
    {
      onSuccess: (data) => {
        socket.emit("devices_register");
        notification.success({ message: "Đăng ký thành công" });
        history.push("/list-register-devices");
      },
      onError: (error) => {
        if (error.response.status === 400) {
          notification.error({
            message: `User not exist `,
          });
        }
      },
    }
  );

  return (
    <Spin tip="Loading ....." spinning={isPostingInfo}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row justify="space-between">
          <Col xs={24} xxl={10}>
            <Form.Item
              name="firstName"
              label="First name"
              rules={[{ required: true, message: "You need fill require" }]}
            >
              <Input placeholder="Fill first name" />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="lastName"
              label="Last name"
              rules={[
                {
                  required: true,
                  message: "You need fill required",
                },
              ]}
            >
              <Input placeholder="Fill last name" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col xs={24} xxl={10}>
            <Form.Item
              name="majors"
              label="Major"
              rules={[
                {
                  required: true,
                  message: "You need fill required",
                },
              ]}
            >
              <Select placeholder="Majors" options={listMajor} />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="devices"
              label="Devices"
              rules={[
                {
                  required: true,
                  message: "You need fill required",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chosse devices"
                options={listDevices.map((item) => {
                  return {
                    value: item.code,
                    label: item.label,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col xs={24} xxl={10}>
            <Form.Item
              name="borrowDate"
              label="Borrow date"
              rules={[
                {
                  required: true,
                  message: "You need fill required",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  return moment().subtract(0, "days") > current;
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="returnDate"
              label="Return date"
              rules={[
                {
                  required: true,
                  message: "You need fill required",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  return moment().subtract(0, "days") > current;
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col xs={24} xxl={10}>
            <Form.Item
              name="studentCode"
              label="Student code"
              rules={[
                {
                  required: true,
                  message: "You need fill required",
                },
              ]}
            >
              <Input placeholder="You fill student code" />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="purpose"
              label="Purpose"
              rules={[
                {
                  required: true,
                  message: "You need fill required",
                },
              ]}
            >
              <TextArea rows={4} placeholder="You fill purpose " />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Space>
            <ButtonPrimary nameBtn="Submit" htmlType="submit" />
            <ButtonCancel
              nameBtn="Reset form"
              onClickBtn={() => form.resetFields()}
            />
          </Space>
        </Row>
      </Form>
    </Spin>
  );
};

export default DeviceRegister;
