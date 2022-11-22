import React from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import { listDevices, listMajor } from "../../../utils";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";

const DeviceRegister = () => {
  const [form] = Form.useForm();

  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Row justify="space-between">
        <Col xs={24} xxl={10}>
          <Form.Item
            name="firstName"
            label="First name"
            rules={[{ required: true, message: "You need fill require" }]}
          >
            <Input placeholder="Fill first name" />
          </Form.Item>
        </Col>

        <Col xs={24} xxl={10}>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              {
                required: true,
                message: "You need fill required",
              },
            ]}
          >
            <Input placeholder="Fill last name" />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="space-between">
        <Col xs={24} xxl={10}>
          <Form.Item name="majors" label="Major">
            <Select placeholder="Majors" options={listMajor} />
          </Form.Item>
        </Col>

        <Col xs={24} xxl={10}>
          <Form.Item name="devices" label="Devices">
            <Select
              mode="multiple"
              placeholder="Chosse devices"
              options={listDevices.map((item) => {
                return {
                  value: item.code,
                  label: item.label,
                };
              })}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="space-between">
        <Col xs={24} xxl={10}>
          <Form.Item name="borrowDate" label="Borrow date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} xxl={10}>
          <Form.Item name="returnDate" label="Return date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="center">
        <Space>
          <ButtonPrimary nameBtn="Submit" htmlType="submit" />
          <ButtonCancel
            nameBtn="Reset form"
            onClickBtn={() => form.resetFields()}
          />
        </Space>
      </Row>
    </Form>
  );
};

export default DeviceRegister;
