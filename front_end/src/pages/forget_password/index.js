import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Input, Modal, Result, Spin } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

//local
import { post } from "../../services/axios/baseAPI";
import iconLogo from "../../assets/images/img/logoVertical.png";

//scss
import styles from "./forgetPass.module.scss";
import ModalCountDown from "../../components/modal/modalCountDown";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  //translation
  const { t } = useTranslation("common");

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
  const [disabledInput, setDisabledInput] = useState(false);
  const [captcha, setCaptcha] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onFinish = (value) => {
    if (disabledInput) {
      postCodeVerify(value);
    } else {
      setLoading(true);
      post(`resetPassword`, value)
        .then(() => {
          setAlert({
            status: "success",
            message: t("forget_password.alert_success_send_email"),
          });
          setDisplayMessage(true);
          setDisabledInput(true);
          setLoading(false);
        })
        .catch((err) => {
          setAlert({
            status: "error",
            message: t("forget_password.alert_error_exist"),
          });
          setDisplayMessage(true);
          setLoading(false);
        });
    }
  };

  const postEmail = (data) => post(`sendCode`, data);

  const { mutate: postCodeVerify, isLoading: isPostingReset } = useMutation(
    postEmail,
    {
      onSuccess: (data) => {
        setOpenModal(true);
        setDisplayMessage(true);
        setTimeout(() => {
          history.push(`/login`);
        }, 5000);
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
    <>
      <div className={styles.wrapperResetPass}>
        <div>
          <img className={styles.logo} src={iconLogo} alt="Logo TLU" />
        </div>
        <div>
          <h1 className={styles.title}>{t("forget_password.title_header")}</h1>
        </div>
        <div className={styles.wrapperForm}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Spin spinning={isPostingReset || loading}>
              <Form.Item
                label={t("forget_password.label_email_verify")}
                name="emailVerify"
              >
                <Input
                  placeholder={t("forget_password.placeholder_email")}
                  className={styles.inputItem}
                  disabled={disabledInput}
                />
              </Form.Item>
              {disabledInput && (
                <Form.Item
                  label={t("forget_password.label_code_verify")}
                  name="codeVerify"
                >
                  <Input
                    placeholder={t("forget_password.placeholder_code")}
                    className={styles.inputItem}
                  />
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
                  {disabledInput
                    ? t("forget_password.btn_send_code")
                    : t("forget_password.btn_reset_email")}
                </Button>
              </Form.Item>
              <div style={{ textAlign: "center" }}>
                <a href="/login" className={styles.textLink}>
                  {t("forget_password.text_link_to_login")}
                </a>
              </div>
              {displayMessage && (
                <Alert message={alert.message} type={alert.status} />
              )}
            </Spin>
          </Form>
        </div>
      </div>
      {openModal && <ModalCountDown isModal={openModal} />}
    </>
  );
};

export default ForgotPassword;
