import React from "react";
import { Form, Spin, Input, Checkbox, Button, notification } from "antd";
import { useMutation } from "@tanstack/react-query";

//local
import { post } from "../../services/axios/baseAPI";
import { setCookie, STORAGEKEY } from "../../services/cookies";

//icon
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import iconLogo from "../../assets/images/img/logoVertical.png";

//scss
import styles from "./login.module.scss";

const Login = () => {
  const onFinish = (value) => {
    loginUser(value);
  };

  const postUser = (data) => post(`login`, data);

  const { mutate: loginUser, isLoading: isPostingInfo } = useMutation(
    postUser,
    {
      onSuccess: (data) => {
        console.log(data);
        const { accessToken, message, isChangePassword } = data;
        setCookie(STORAGEKEY.ACCESS_TOKEN, accessToken);
        localStorage.setItem("isChangePW", isChangePassword);
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
        <Spin size="large" tip="Verifying login....." spinning={isPostingInfo}>
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
                  message: "Please input your email!",
                },
                {
                  pattern: /[A-Za-zd.0-9-]+@thanglong\.edu\.vn/,
                  message: "Malformed @thanglong.edu.vn",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined />}
                className={styles.item_input_form}
                placeholder="studencode@thanglong.edu.vn"
                autoFocus
              />
            </Form.Item>

            <Form.Item
              className={styles.form_item}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                className={styles.item_input_form}
                placeholder="password"
              />
            </Form.Item>

            <Form.Item className={styles.form_option}>
              <div className={styles.selectOption}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a
                  href="/forget-password"
                  target="_blank"
                  className={styles.textLink}
                >
                  Forgot password
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button className="btnLogin" htmlType="submit">
                Login
              </Button>
            </Form.Item>
            <a
              href="/register"
              target="_blank"
              className={styles.textLink}
            >{`Register, Don't have an account!`}</a>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
