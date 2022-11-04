import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Space,
  Popconfirm,
  notification,
} from "antd";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

//local
import { post } from "../../../services/axios/baseAPI";

//scss
import styles from "./register.module.scss";
import { getAccountUser } from "../../../store/modules/usersSlices";

const Register = () => {
  //redux
  const dispatch = useDispatch();

  //history
  const history = useHistory();
  //form
  const [form] = Form.useForm();
  //format birthday
  const formatBirthday = "DD/MM/YYYY";

  //state
  const [office, setOffice] = useState();

  const onFinish = (value) => {
    const newData = {
      ...value,
      office: office === 0 ? 0 : value.office,
      majors: `${value.majors}${Number(moment().format("YYYY")) - 1988}`,
    };
    registerUser(newData);
  };

  const postCreate = (data) => post(`register`, data);

  const { mutate: registerUser, isLoading: isCreatingUser } = useMutation(
    postCreate,
    {
      onSuccess: (data) => {
        console.log(data);
        const { userInfo } = data;
        dispatch(getAccountUser(userInfo));
        history.push("/success-register");
      },
      onError: (error) => {
        notification.error({ message: error.response.data.message });
        console.log(error);
      },
    }
  );

  const onResetForm = () => {
    form.resetFields();
  };

  const handleRole = (value) => {
    setOffice(value);
  };

  return (
    <Spin tip="Creating user....." spinning={isCreatingUser}>
      <h1 className={styles.titlePage}>Register user</h1>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          office: 1,
          role: 1,
          birthday: moment().subtract("18", "years"),
        }}
      >
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

        <Form.Item
          label="Majors"
          name="majors"
          rules={[
            {
              required: true,
              message: "Please choose your majors",
            },
          ]}
        >
          <Select
            className="selectRegister"
            showSearch
            placeholder="Search to majors"
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
                value: "TC",
                label: "TC",
              },
              {
                value: "TT",
                label: "TT",
              },
              {
                value: "TE",
                label: "TE",
              },
              {
                value: "TI",
                label: "TI",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Student code"
          name="studentCode"
          rules={[
            {
              required: true,
              message: "Please input your class",
            },
          ]}
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select
            className="selectRegister"
            onChange={handleRole}
            options={[
              { value: 1, label: "User" },
              { value: 0, label: "Admin" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Office" name="office">
          <Select
            className="selectRegister"
            disabled={office === 0}
            options={[
              { value: 1, label: "Student" },
              { value: 2, label: "Teacher" },
            ]}
          />
        </Form.Item>

        <Form.Item
          className="selectRegister"
          label="Birthday"
          name="birthday"
          rules={[
            {
              required: true,
              message: "Please choose birthday",
            },
          ]}
        >
          <DatePicker
            format={formatBirthday}
            style={{ width: "100%" }}
            defaultValue={moment().subtract("18", "years")}
            disabledDate={(current) => {
              return moment().subtract("18", "years") < current;
            }}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Space>
            <Button htmlType="submit" className="btn editProfile">
              Create user
            </Button>
            <Popconfirm
              title="Are you sure reset form ?"
              onConfirm={onResetForm}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn cancel">Reset form</Button>
            </Popconfirm>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Register;
