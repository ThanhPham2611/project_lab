import { Row, Col, Form, Input, DatePicker, Button } from "antd";
import React from "react";

// local
// import { post } from '../../../api/BaseRequest'

// scss
import styles from "./addDevice.module.scss";

const AddDevice = () => {
  // state
  const formatTime = "YYYY-MM-DD HH:mm";
  const [form] = Form.useForm();

  const onFinish = (value) => {
    // post('api/postnewdevice', value)
    console.log(value);
  };

  return (
    <Row>
      <Col className={styles.addDevice_form} xl={24}>
        <Form
          className="form"
          name="form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row className={styles.formRow} xl={24}>
            <Col xl={10}>
              <Form.Item
                name="deviceName"
                label="Device Name"
                rules={[
                  { required: true, message: "Please input device name!" },
                ]}
              >
                <Input className={styles.formInput} placeholder="Fill the name..." />
              </Form.Item>
            </Col>
            <Col xl={10}>
              <Form.Item
                name="deviceCode"
                label="Device Code"
                rules={[
                  { required: true, message: "Please input device code!" },
                ]}
              >
                <Input className={styles.formInput} placeholder="Fill the code..." />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.formRow} xl={24}>
            <Col xl={10}>
              <Form.Item
                name="deviceType"
                label="Device Type"
                rules={[
                  { required: true, message: "Please input device type!" },
                ]}
              >
                <Input className={styles.formInput} placeholder="Fill the type..." />
              </Form.Item>
            </Col>
            <Col xl={10}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[
                  { required: true, message: "Please input amount!" },
                  { pattern: /^(?:\d*)$/, message: "It is not a valid number" },
                ]}
              >
                <Input className={styles.formInput} placeholder="Fill amount..." />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.formRow} xl={24}>
            <Col xl={10}>
              <Form.Item
                name="importDate"
                label="Import Date"
                rules={[
                  { required: true, message: "Please input device type!" },
                ]}
              >
                <DatePicker className={styles.formInput} showTime format={formatTime} />
              </Form.Item>
            </Col>
            <Col xl={10}>
              <Form.Item
                name="manager"
                label="Manager"
                rules={[{ required: true, message: "Please input manager!" }]}
              >
                <Input className={styles.formInput} placeholder="Fill manager..." />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.formRow} xl={24}>
            <Col xl={10}>
              <Form.Item
                name="purpose"
                label="Purpose"
                rules={[{ required: true, message: "Please input purpose!" }]}
              >
                <Input className={styles.formInput} placeholder="Fill the purpose..." />
              </Form.Item>
            </Col>
            <Col xl={10}>
              <Form.Item name="note" label="Note">
                <Input className={styles.formInput} placeholder="Fill the note..." />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className={styles.addDevice_form_btn} xl={24}>
              <Button type="primary" htmlType="submit">
                Submit Form
              </Button>
              <Button type="primary" danger htmlType="button">
                Reset Form
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default AddDevice;
