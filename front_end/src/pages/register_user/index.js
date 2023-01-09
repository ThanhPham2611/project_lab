import {
  Col,
  DatePicker,
  Divider,
  Form,
  notification,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { Input } from "antd";
import React from "react";

//local
import { REG_EMAIL, REG_PASSWORD } from "../../utils/regex";
import ButtonPrimary from "../../components/button/buttonPrimary";
import ButtonCancel from "../../components/button/buttonCancel";
import { listMajor } from "../../utils";
import { listOffice } from "../../utils/role";
import { post } from "../../services/axios/baseAPI";
//scss
import styles from "./registerUser.module.scss";

const RegisterUser = () => {
  //state
  const [form] = Form.useForm();

  const onFinish = (value) => {
    const newData = {
      ...value,
      isActive: false,
    };
    post(`registerUser`, newData)
      .then((res) => {
        console.log(res);
        notification.success({ message: "Success" });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 409) {
          notification.error({ message: "Student code exists" });
        } else {
          notification.error({ message: "Fail" });
        }
      });
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={false}>
      <div className={styles.wrapperBG}>
        <h1 className={styles.titleHeaderPage}>Register user</h1>
        <Divider />
        <Row justify="center">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className={styles.wrapperForm}
            autoComplete="off"
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Fail",
                    },
                    {
                      pattern: REG_EMAIL,
                      message: "Fail regex mail",
                    },
                  ]}
                >
                  <Input placeholder="Fill your email " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Fail",
                    },
                    {
                      pattern: REG_PASSWORD,
                      message: "Fail regex password",
                    },
                  ]}
                >
                  <Input.Password placeholder="Fill your password" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-around" gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="firstName" label="Fisrt name">
                  <Input placeholder="Fill your first name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lastName" label="Last name">
                  <Input placeholder="Fill your last name" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-around" gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="studentCode" label="Student code">
                  <Input placeholder="Fill your student code" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="phone" label="Phone">
                  <Input placeholder="Fill your phone" />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-around" gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="majors" label="Major">
                  <Select placeholder="Choose your major" options={listMajor} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="office" label="Office">
                  <Select
                    placeholder="Choose your office"
                    options={listOffice}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Form.Item name="birthday" label="Birthday">
                <DatePicker />
              </Form.Item>
            </Row>

            <Row justify="center">
              <Space>
                <ButtonPrimary nameBtn="Submit" htmlType="submmit" />
                <ButtonCancel nameBtn="Reset form" onClickBtn={resetForm} />
              </Space>
            </Row>

            <Row justify="center" className={styles.wrapperRowLink}>
              <a href="/login" className={styles.textLink}>
                Sign in, I already have an account
              </a>
            </Row>
          </Form>
        </Row>
      </div>
    </Spin>
  );
};

export default RegisterUser;
