import React, { useState } from "react";
import { Alert, Button, Form, Input, Spin } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "@tanstack/react-query";

//local
import { post } from "../../services/axios/baseAPI";

//icon
import iconLogo from "../../assets/images/img/logoVertical.png";

//scss
import styles from "./forgetPass.module.scss";

const ForgotPassword = () => {
  const [form] = Form.useForm();

  // state
  const [alert, setAlert] = useState({
    status: "success",
    message: "",
  });
  const [displayMessage, setDisplayMessage] = useState(false);

  const onFinish = (values) => {
    postEmailReset(values);
  };

  const postEmail = (data) => post(`resetPassword`, data);

  const { mutate: postEmailReset, isLoading: isPostingReset } = useMutation(
    postEmail,
    {
      onSuccess: (data) => {
        setDisplayMessage(true);
        setAlert({
          status: "success",
          message: data.message,
        });
        window.location.href = "/login";
      },
      onError: (error) => {
        setAlert({
          status: "error",
          message: error.response.data.message,
        });
        setDisplayMessage(true);
      },
    }
  );

  const onChangeCapt = (value) => {
    console.log("capt", value);
  };
  return (
    <Spin spinning={isPostingReset}>
      <div className={styles.wrapperResetPass}>
        <div>
          <img className={styles.logo} src={iconLogo} alt="Logo TLU" />
        </div>
        <div>
          <h1 className={styles.title}>Reset your password</h1>
        </div>
        <div className={styles.wrapperForm}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email verify" name="emailVerify">
              <Input
                placeholder="Enter your email address"
                className={styles.inputItem}
              />
            </Form.Item>
            <Form.Item>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_GG_CAPTCHA_KEY}
                onChange={onChangeCapt}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                className={styles.btnSend}
                type="primary"
                htmlType="submit"
              >
                Send password reset email
              </Button>
            </Form.Item>
            {displayMessage && (
              <Alert message={alert.message} type={alert.status} />
            )}
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default ForgotPassword;
