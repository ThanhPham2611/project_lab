import { Row, Col, Form, Input, DatePicker, Spin, Divider, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";
import { formatDate } from "../../../utils";

// scss
import styles from "./addDevice.module.scss";

const { TextArea } = Input;

const AddDevice = () => {
  //translation
  const { t } = useTranslation("common");

  const [form] = Form.useForm();

  const onFinish = (value) => {
    console.log(value);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={false} tip={t("ults.spin_loading")}>
      <h1 className={styles.titlePage}>{t("user_regsiter.title_register")}</h1>
      <Divider />
      <Form
        className="form"
        name="form"
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row className={styles.formRow}>
          <Col xs={24} xl={10} xxl={10}>
            <Form.Item
              name="deviceName"
              label={t("add_devices.device_name")}
              rules={[
                {
                  required: true,
                  message: t("add_devices.error_required_device_name"),
                },
              ]}
            >
              <Input
                className={styles.formInput}
                placeholder={t("add_devices.placeholder_device_name")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={10} xxl={10}>
            <Form.Item
              name="deviceCode"
              label={t("add_devices.device_code")}
              rules={[
                {
                  required: true,
                  message: t("add_devices.error_required_device_code"),
                },
              ]}
            >
              <Input
                className={styles.formInput}
                placeholder={t("add_devices.placeholder_device_code")}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.formRow}>
          <Col xs={24} xl={10} xxl={10}>
            <Form.Item
              name="deviceType"
              label={t("add_devices.device_type")}
              rules={[
                {
                  required: true,
                  message: t("add_devices.error_required_device_type"),
                },
              ]}
            >
              <Input
                className={styles.formInput}
                placeholder={t("add_devices.placeholder_device_type")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={10} xxl={10}>
            <Form.Item
              name="amount"
              label={t("add_devices.amount")}
              rules={[
                {
                  required: true,
                  message: t("add_devices.error_required_amount"),
                },
                { pattern: /^(?:\d*)$/, message: t("ults.regex_number") },
              ]}
            >
              <Input
                className={styles.formInput}
                placeholder={t("add_devices.placeholder_amount")}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.formRow}>
          <Col xs={24} xl={10}>
            <Form.Item
              name="importDate"
              label={t("add_devices.import_date")}
              rules={[
                {
                  required: true,
                  message: t("add_devices.error_required_import_date"),
                },
              ]}
            >
              <DatePicker
                className={styles.formInput}
                format={formatDate}
                placeholder={t("add_devices.placeholder_import_date")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={10}>
            <Form.Item
              name="manager"
              label={t("add_devices.manager")}
              rules={[
                {
                  required: true,
                  message: t("add_devices.error_required_manager"),
                },
              ]}
            >
              <Input
                className={styles.formInput}
                placeholder={t("add_devices.placeholder_manager")}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.formRow}>
          <Col xs={24} xl={10}>
            <Form.Item
              name="purpose"
              label={t("add_devices.purpose")}
              rules={[
                {
                  required: true,
                  message: t("add_devices.error_required_purpose"),
                },
              ]}
            >
              <Input
                className={styles.formInput}
                placeholder={t("add_devices.placeholder_manager")}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={10}>
            <Form.Item name="note" label={t("add_devices.note")}>
              <TextArea
                rows={4}
                placeholder={t("add_devices.placeholder_note")}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xxl={24}>
            <Space>
              <ButtonPrimary
                nameBtn={t("add_devices.btn_submit")}
                htmlType="submit"
              />
              <ButtonCancel
                nameBtn={t("add_devices.btn_reset")}
                onClickBtn={handleReset}
              />
            </Space>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default AddDevice;
