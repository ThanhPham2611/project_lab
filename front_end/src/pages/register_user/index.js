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
import { useHistory } from "react-router-dom";

//local
import { REG_EMAIL, REG_PASSWORD } from "../../utils/regex";
import ButtonPrimary from "../../components/button/buttonPrimary";
import ButtonCancel from "../../components/button/buttonCancel";
import { listMajor } from "../../utils";
import { listOffice } from "../../utils/role";
import { post } from "../../services/axios/baseAPI";
//scss
import styles from "./registerUser.module.scss";
import { useTranslation } from "react-i18next";

const RegisterUser = () => {
  //translation
  const { t } = useTranslation("common");

  //state
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (value) => {
    const newData = {
      ...value,
      email: value.email.toLowerCase(),
      studentCode: value.studentCode.toLowerCase(),
      isActive: false,
    };
    post(`registerUser`, newData)
      .then(() => {
        notification.success({
          message: t("register_user.notify_success_created"),
        });
        form.resetFields();
        history.push("/login");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          notification.error({
            message: t("register_user.notify_error_student_code"),
          });
        } else {
          notification.error({
            message: t("register_user.notify_error_email"),
          });
        }
      });
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={false}>
      <div className={styles.wrapperBG}>
        <h1 className={styles.titleHeaderPage}>
          {t("register_user.title_header")}
        </h1>
        <Divider />
        <Row justify="center">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className={styles.wrapperForm}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label={t("register_user.label_email")}
                  rules={[
                    {
                      required: true,
                      message: t("register_user.error_text_email"),
                    },
                    {
                      pattern: REG_EMAIL,
                      message: t("register_user.error_regex_email"),
                    },
                  ]}
                >
                  <Input placeholder={t("register_user.placeholder_email")} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label={t("register_user.label_password")}
                  rules={[
                    {
                      required: true,
                      message: t("register_user.error_text_password"),
                    },
                    {
                      pattern: REG_PASSWORD,
                      message: t("register_user.error_regex_password"),
                    },
                  ]}
                >
                  <Input.Password
                    placeholder={t("register_user.placeholder_password")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-around" gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label={t("register_user.label_first_name")}
                  rules={[
                    {
                      required: true,
                      message: t("register_user.error_text_first_name"),
                    },
                    {
                      pattern: /[\S\s]+[\S]+/,
                      message: t("register_user.error_regex_not_empty"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("register_user.placeholder_first_name")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label={t("register_user.label_last_name")}
                  rules={[
                    {
                      required: true,
                      message: t("register_user.error_text_last_name"),
                    },
                    {
                      pattern: /[\S\s]+[\S]+/,
                      message: t("register_user.error_regex_not_empty"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("register_user.placeholder_last_name")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-around" gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="studentCode"
                  label={t("register_user.label_student_code")}
                  rules={[
                    {
                      required: true,
                      message: t("register_user.error_text_student_code"),
                    },
                    {
                      pattern: /[\S\s]+[\S]+/,
                      message: t("register_user.error_regex_not_empty"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("register_user.placeholder_student_code")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label={t("register_user.label_phone")}
                  rules={[
                    {
                      required: true,
                      message: t("register_user.error_text_phone"),
                    },
                    {
                      pattern: /[\S\s]+[\S]+/,
                      message: t("register_user.error_regex_not_empty"),
                    },
                  ]}
                >
                  <Input placeholder={t("register_user.placeholder_phone")} />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="space-around" gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="majors"
                  label={t("register_user.label_major")}
                  rules={[
                    {
                      required: true,
                      message: t("register_user.error_choose_major"),
                    },
                  ]}
                >
                  <Select
                    placeholder={t("register_user.placeholder_major")}
                    options={listMajor}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="office"
                  label={t("register_user.label_office")}
                  rules={[
                    {
                      required: true,
                      message: t("register_user.error_choose_office"),
                    },
                  ]}
                >
                  <Select
                    placeholder={t("register_user.placeholder_office")}
                    options={listOffice}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Col span={14}>
                <Form.Item
                  name="birthday"
                  label={t("register_user.label_birthday")}
                  rules={[
                    {
                      required: true,
                      message: t("register_user.error_choose_birthday"),
                    },
                  ]}
                >
                  <DatePicker
                    placeholder={t("register_user.placeholder_birthday")}
                    className="fullWidth"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row justify="center">
              <Space>
                <ButtonPrimary
                  nameBtn={t("register_user.btn_submit")}
                  htmlType="submmit"
                />
                <ButtonCancel
                  nameBtn={t("register_user.btn_reset")}
                  onClickBtn={resetForm}
                />
              </Space>
            </Row>

            <Row justify="center" className={styles.wrapperRowLink}>
              <a href="/login" className={styles.textLink}>
                {t("register_user.text_link_to_login")}
              </a>
            </Row>
          </Form>
        </Row>
      </div>
    </Spin>
  );
};

export default RegisterUser;
