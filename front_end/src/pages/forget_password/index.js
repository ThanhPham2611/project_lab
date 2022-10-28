import React, { useState } from "react";
import { Alert, Button, Form, Input, Spin } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

//local
import { post } from "../../services/axios/baseAPI";

//icon
import iconLogo from "../../assets/images/img/logoVertical.png";

//scss
import styles from "./forgetPass.module.scss";
import axios from "axios";

const ForgotPassword = () => {
  //form
  const [form] = Form.useForm();

  //history
  const history = useHistory();

  // state
  const [alert, setAlert] = useState({
    status: "success",
    message: "",
  });
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayInputCode, setDisplayInputCode] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [captcha, setCaptcha] = useState();

  const onFinish = (values) => {
    if (disabledInput) {
      console.log(values);
      postCodeVerify(values);
    } else {
      axios
        .post(`http://localhost:8080/api/resetPassword`, {
          emailVerify: values.emailVerify,
        })
        .then((res) => {
          const { data } = res;
          setAlert({
            status: "success",
            message: data.message,
          });
          setDisplayMessage(true);
          setDisabledInput(true);
        })
        .catch((err) => {
          setAlert({
            status: "error",
            message: err.response.data.message,
          });
          setDisplayMessage(true);
        });
    }
  };

  const postEmail = (data) => post(`sendCode`, data);

  const { mutate: postCodeVerify, isLoading: isPostingReset } = useMutation(
    postEmail,
    {
      onSuccess: (data) => {
        setAlert({
          status: "success",
          message: `${data.message}, after 3 second change page login`,
        });
        setDisplayMessage(true);
        setTimeout(() => {
          history.push(`/login`);
        }, 3000);
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
    setCaptcha(value);
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
                disabled={disabledInput}
              />
            </Form.Item>
            {disabledInput && (
              <Form.Item label="Code verify" name="codeVerify">
                <Input placeholder="Code verify" className={styles.inputItem} />
              </Form.Item>
            )}
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
                disabled={!captcha}
              >
                {disabledInput ? "Send code" : "Send password reset email"}
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
