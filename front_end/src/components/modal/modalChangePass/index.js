import React from "react";
import { Modal, Form, Input, Space, Spin, Row, Col } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

//local
import { patch } from "../../../services/axios/baseAPI";
import ButtonPrimary from "../../button/buttonPrimary";
import ButtonCancel from "../../button/buttonCancel";

//scss
import styles from "./changePass.module.scss";

const ModalChangePassword = ({ isModalVisible, setIsModalVisible }) => {
  //translation
  const { t } = useTranslation("common");

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const patchChangePassword = (data) => patch(`updatePassword`, data);

  const { mutate: patchPassword, isLoading: isPatchingPassword } = useMutation(
    patchChangePassword,
    {
      onSuccess: (data) => {
        setIsModalVisible(false);
        form.resetFields();
      },
      onError: (error) => {},
    }
  );

  const onFinish = (values) => {
    patchPassword(values);
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      <Modal
        title={t("modal_change_pass.title_change_password")}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Spin tip="Changing password......" spinning={isPatchingPassword}>
          <Form
            name="Change Password"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row className="rowContent" gutter={[16, 16]} align="middle">
              <Col xxl={8} xl={7} xs={24}>
                <label>{t("modal_change_pass.old_password")}:</label>
              </Col>
              <Col xxl={16} xl={17} xs={24}>
                <Form.Item
                  name="oldPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password className={styles.inputPass} />
                </Form.Item>
              </Col>
            </Row>

            <Row className="rowContent" gutter={[16, 16]} align="middle">
              <Col xxl={8} xl={7} xs={24}>
                <label>{t("modal_change_pass.new_password")}:</label>
              </Col>
              <Col xxl={16} xl={17} xs={24}>
                <Form.Item
                  name="newPassword"
                  dependencies={["oldPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("oldPassword") !== value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The new password is the same as the old password"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password className={styles.inputPass} />
                </Form.Item>
              </Col>
            </Row>

            <Row className="rowContent" gutter={[16, 16]} align="middle">
              <Col xxl={8} xl={7} xs={24}>
                <label>{t("modal_change_pass.confirm_password")}:</label>
              </Col>
              <Col xxl={16} xl={17} xs={24}>
                <Form.Item
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password className={styles.inputPass} />
                </Form.Item>
              </Col>
            </Row>

            <Row className="rowContent" justify="center">
              <Space>
                <ButtonPrimary
                  classNameBtn={styles.btnChangePass}
                  nameBtn={t("modal_change_pass.btn_change_pass")}
                  htmlType="submit"
                />
                <ButtonCancel
                  nameBtn={t("modal_change_pass.btn_cancel")}
                  onClickBtn={handleCancel}
                />
              </Space>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default ModalChangePassword;
