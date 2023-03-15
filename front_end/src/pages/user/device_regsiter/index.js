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
import moment from "moment";

//local
import { listDevices, listMajor } from "../../../utils";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";
import { post } from "../../../services/axios/baseAPI";

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
      studentCode: value.studentCode.toLowerCase(),
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
            message: `Người dùng không tồn tại`,
          });
        }
      },
    }
  );

  return (
    <Spin tip="Đang tải....." spinning={isPostingInfo}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row justify="space-between">
          <Col xs={24} xxl={10}>
            <Form.Item
              name="firstName"
              label="Họ"
              rules={[{ required: true, message: "Trường này cần điền" }]}
            >
              <Input placeholder="Điền họ của bạn" />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="lastName"
              label="Và Tên"
              rules={[
                {
                  required: true,
                  message: "Trường này cần điền",
                },
              ]}
            >
              <Input placeholder="Điền tên của bạn" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col xs={24} xxl={10}>
            <Form.Item
              name="majors"
              label="Ngành"
              rules={[
                {
                  required: true,
                  message: "Bạn cần điền trường này",
                },
              ]}
            >
              <Select placeholder="Ngành học" options={listMajor} />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="devices"
              label="Thiết bị"
              rules={[
                {
                  required: true,
                  message: "Bạn cần điền trường này",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn thiết bị"
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
              label="Ngày mượn"
              rules={[
                {
                  required: true,
                  message: "Bạn cần điền trường này",
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
              label="Ngày trả"
              rules={[
                {
                  required: true,
                  message: "Bạn cần điền trường này",
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
              label="Mã sinh viên"
              rules={[
                {
                  required: true,
                  message: "Bạn cần điền trường này",
                },
              ]}
            >
              <Input placeholder="Điền mã sinh viên của bạn" />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="purpose"
              label="Lý do"
              rules={[
                {
                  required: true,
                  message: "Bạn cần điền trường này",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Điền lý do" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Space>
            <ButtonPrimary nameBtn="Tạo người dùng" htmlType="submit" />
            <ButtonCancel
              nameBtn="Nhập lại"
              onClickBtn={() => form.resetFields()}
            />
          </Space>
        </Row>
      </Form>
    </Spin>
  );
};

export default DeviceRegister;
