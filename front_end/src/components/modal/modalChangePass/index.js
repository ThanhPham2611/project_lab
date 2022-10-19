import React from "react";
import { Modal, Form, Input, Button, Space, Spin } from "antd";
import { useMutation } from "@tanstack/react-query";

//local
import { patch } from "../../../services/axios/baseAPI";

//scss
import styles from "./changePass.module.scss";

const ModalChangePassword = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const patchChangePassword = (data) => patch(`api/updatePassword`, data);

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
        title="Change Password"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Spin tip="Changing password......" spinning={isPatchingPassword}>
          <Form
            name="Change Password"
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Old password"
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

            <Form.Item
              label="New password"
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

            <Form.Item
              label="Confirm Password"
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

            <Form.Item>
              <Space className={styles.btnGroup}>
                <Button
                  className={`${styles.btn} ${styles.changePass}`}
                  key="submit"
                  type="primary"
                  htmlType="submit"
                >
                  Change Password
                </Button>
                <Button
                  className={styles.btn}
                  key="cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default ModalChangePassword;
