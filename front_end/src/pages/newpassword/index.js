import React from "react";
import { Form, Input, Button, Spin, message } from "antd";
import { useMutation } from "@tanstack/react-query";

//local
import { STORAGEKEY, removeCookie } from "../../services/cookies";
import { patch } from "../../services/axios/baseAPI";

//icon
import iconLogo from "../../assets/images/img/logoVertical.png";

//scss
import styles from "./newPassword.module.scss";

const NewPassword = () => {
  const onFinish = (value) => {
    patchPassword(value);
  };

  const patchChangePassword = (data) => patch(`updatePassword`, data);

  const { mutate: patchPassword, isLoading: isPatchingPassword } = useMutation(
    patchChangePassword,
    {
      onSuccess: (data) => {
        localStorage.removeItem("role");
        localStorage.removeItem("isChange");
        removeCookie(STORAGEKEY.ACCESS_TOKEN);
        window.location.href = "/login";
      },
      onError: (error) => {
        message.error(`${error.response.data.message}`);
      },
    }
  );

  return (
    <Spin spinning={isPatchingPassword} tip="Loading....">
      <div className={styles.wrapperPage}>
        <div className={styles.wrapperHeader}>
          <span className={styles.titleHeader}>New password</span>
        </div>
        <div className={styles.wrapperLogo}>
          <img className={styles.logo} src={iconLogo} alt="logo tlu" />
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className={styles.formInput}
        >
          <Form.Item label="New Password" name="newPassword">
            <Input.Password className={styles.inputPass} />
          </Form.Item>

          <Form.Item
            label="Re New Password"
            name="reNewPassword"
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
            <Button className="btnChangePass" type="primary" htmlType="submit">
              Change password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default NewPassword;
