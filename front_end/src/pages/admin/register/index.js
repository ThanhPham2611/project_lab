import React from "react";
import { DatePicker, Form, Input, Select, Spin } from "antd";

//scss
import styles from "./register.module.scss";

const Register = () => {
  //form
  const [form] = Form.useForm();
  //format birthday
  const formatBirthday = "DD/MM/YYYY";

  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <Spin tip="Creating user....." spinning={false}>
      <h1>Register user</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
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
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item
          label="First name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name",
            },
          ]}
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name",
            },
          ]}
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone",
            },
          ]}
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item label="Class" name="class">
          <Select
            className="selectRegister"
            showSearch
            placeholder="Search to class"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "TC",
              },
              {
                value: "2",
                label: "TT",
              },
              {
                value: "3",
                label: "TE",
              },
              {
                value: "4",
                label: "TI",
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select
            className="selectRegister"
            defaultValue={1}
            options={[
              { value: 1, label: "User" },
              { value: 0, label: "Admin" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Office" name="office">
          <Select
            className="selectRegister"
            defaultValue={1}
            options={[
              { value: 1, label: "Student" },
              { value: 2, label: "Teacher" },
              { value: 3, label: "Admin" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Birthday"
          name="birthday"
          rules={[
            {
              required: true,
              message: "Please choose birthday",
            },
          ]}
        >
          <DatePicker format={formatBirthday} />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Register;
