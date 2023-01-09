import React from "react";
import { Form, Spin, Input, Checkbox, Button, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

//local
import { post } from "../../services/axios/baseAPI";
import { setCookie, STORAGEKEY } from "../../services/cookies";
import { REG_EMAIL } from "../../utils/regex";

//icon
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import iconLogo from "../../assets/images/img/logoVertical.png";

//scss
import styles from "./login.module.scss";
import { io } from "socket.io-client";

// socket
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
});

const Login = () => {
  //translation
  const { t } = useTranslation("common");

  const onFinish = (value) => {
    loginUser(value);
  };

  const postUser = (data) => post(`login`, data);

  const { mutate: loginUser, isLoading: isPostingInfo } = useMutation(
    postUser,
    {
      onSuccess: (data) => {
        const { accessToken, message, isChangePassword, role } = data;
        if (role === 0) {
          const checkAdmin = prompt(t("ults.question_prompt"));
          if (checkAdmin !== process.env.REACT_APP_CODE_ADMIN)
            return alert(t("ults.confirm_login_fail"));
        }
        socket.emit("connected");
        setCookie(STORAGEKEY.ACCESS_TOKEN, accessToken);
        localStorage.setItem(STORAGEKEY.CHANGE_PASSWORD, isChangePassword);
        if (isChangePassword) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/new-password";
        }
        notification.success({
          message,
        });
      },
      onError: (error) => {
        notification.error({
          message: `${error.response.data.message}`,
        });
      },
    }
  );

  return (
    <div style={{ position: "relative" }}>
      <div className={styles.wrapperLogin}>
        <div className={styles.bg_img_login}></div>
        <Spin
          size="large"
          tip={t("login.verify_login")}
          spinning={isPostingInfo}
        >
          <Form
            className={styles.form_login}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <div>
              <img src={iconLogo} alt="logo tlu" className={styles.logo} />
            </div>

            <Form.Item
              className={styles.form_item}
              name="email"
              rules={[
                {
                  required: true,
                  message: t("login.error_input_email"),
                },
                {
                  pattern: REG_EMAIL,
                  message: t("login.error_format_email"),
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined />}
                className={styles.item_input_form}
                placeholder={t("login.placeholder_email")}
                autoFocus
              />
            </Form.Item>

            <Form.Item
              className={styles.form_item}
              name="password"
              rules={[
                {
                  required: true,
                  message: t("login.error_input_password"),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                className={styles.item_input_form}
                placeholder={t("login.placeholder_pass")}
              />
            </Form.Item>

            <Form.Item className={styles.form_option}>
              <div className={styles.selectOption}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>{t("login.checkbox_remember")}</Checkbox>
                </Form.Item>
                <a
                  href="/forget-password"
                  target="_blank"
                  className={styles.textLink}
                >
                  {t("login.forget_password")}
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button className="btnLogin" htmlType="submit">
                {t("login.btn_login")}
              </Button>
            </Form.Item>
            <div>
              <a className={styles.textLink} href="/register-user">
                {t("login.link_register")}
              </a>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
