import React, { useEffect, useState } from "react";
import {
  Col,
  DatePicker,
  Divider,
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
import { useTranslation } from "react-i18next";

//local
import { listMajor } from "../../../utils";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";
import { get, post } from "../../../services/axios/baseAPI";

// socket
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
});

const { TextArea } = Input;

const DeviceRegister = () => {
  //translation
  const { t } = useTranslation("common");

  const [form] = Form.useForm();
  const history = useHistory();
  const [dataDevices, setDataDevices] = useState([]);

  useEffect(() => {
    get(`getListDevice`)
      .then((res) => {
        const { data } = res;
        setDataDevices(data);
      })
      .catch(() => {
        return;
      });
  }, []);

  const onFinish = (value) => {
    const newData = {
      ...value,
      studentCode: value.studentCode.toLowerCase(),
      firstName: value.firstName.toLowerCase(),
      lastName: value.lastName.toLowerCase(),
      purpose: value.purpose.toLowerCase(),
    };
    deviceRegister(newData);
  };

  const postDeviceRegister = (data) => post(`deviceRegister`, data);

  const { mutate: deviceRegister, isLoading: isPostingInfo } = useMutation(
    postDeviceRegister,
    {
      onSuccess: () => {
        socket.emit("devices_register");
        notification.success({
          message: t("device_register.notify_register_success"),
        });
        history.push("/list-register-devices");
      },
      onError: (error) => {
        if (error.response.status === 404) {
          notification.error({
            message: t("device_register.notify_error_user_exist"),
          });
        } else {
          notification.error({
            message: t("device_register.notify_server_err"),
          });
        }
      },
    }
  );

  return (
    <Spin tip={t("ults.spin_loading")} spinning={isPostingInfo}>
      <h1 className="titleHeaderPage">{t("device_register.title_header")}</h1>
      <Divider />
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row justify="space-between">
          <Col xs={24} xxl={10}>
            <Form.Item
              name="firstName"
              label={t("device_register.label_first_name")}
              rules={[{ required: true, message: t("ults.rules_form_field") }]}
            >
              <Input
                placeholder={t("device_register.placeholder_first_name")}
              />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="lastName"
              label={t("device_register.label_last_name")}
              rules={[
                {
                  required: true,
                  message: t("ults.rules_form_field"),
                },
              ]}
            >
              <Input placeholder={t("device_register.placeholder_last_name")} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col xs={24} xxl={10}>
            <Form.Item
              name="majors"
              label={t("device_register.label_major")}
              rules={[
                {
                  required: true,
                  message: t("ults.rules_form_field"),
                },
              ]}
            >
              <Select
                placeholder={t("device_register.placeholder_major")}
                options={listMajor}
              />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="devices"
              label={t("device_register.label_devices")}
              rules={[
                {
                  required: true,
                  message: t("ults.rules_form_field"),
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder={t("device_register.placeholder_devices")}
                options={dataDevices.map((item) => {
                  return {
                    value: item.signatureDevice,
                    label: item.nameDevice,
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
              label={t("device_register.label_borrow_date")}
              rules={[
                {
                  required: true,
                  message: t("ults.rules_form_field"),
                },
              ]}
            >
              <DatePicker
                placeholder={t("device_register.placeholder_borrow_date")}
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
              label={t("device_register.label_return_date")}
              rules={[
                {
                  required: true,
                  message: t("ults.rules_form_field"),
                },
              ]}
            >
              <DatePicker
                placeholder={t("device_register.placeholder_return_date")}
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
              label={t("device_register.label_student_code")}
              rules={[
                {
                  required: true,
                  message: t("ults.rules_form_field"),
                },
              ]}
            >
              <Input
                placeholder={t("device_register.placeholder_student_code")}
              />
            </Form.Item>
          </Col>

          <Col xs={24} xxl={10}>
            <Form.Item
              name="purpose"
              label={t("device_register.label_purpose")}
              rules={[
                {
                  required: true,
                  message: t("ults.rules_form_field"),
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder={t("device_register.placeholder_purpose")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Space>
            <ButtonPrimary
              nameBtn={t("device_register.btn_submit")}
              htmlType="submit"
            />
            <ButtonCancel
              nameBtn={t("device_register.btn_reset")}
              onClickBtn={() => form.resetFields()}
            />
          </Space>
        </Row>
      </Form>
    </Spin>
  );
};

export default DeviceRegister;
