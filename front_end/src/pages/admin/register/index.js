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
import { useTranslation } from "react-i18next";

//local
import { post } from "../../../services/axios/baseAPI";
import { REG_EMAIL } from "../../../utils/regex";
import { getAccountUser } from "../../../store/modules/usersSlices";

//scss
import styles from "./register.module.scss";

const Register = () => {
  //redux
  const dispatch = useDispatch();

  //translation
  const { t } = useTranslation("common");

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
    <Spin tip={t("user_regsiter.creating_user")} spinning={isCreatingUser}>
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
          label={t("user_regsiter.email")}
          name="email"
          rules={[
            {
              required: true,
              message: t("user_regsiter.error_input_email"),
            },
            {
              pattern: REG_EMAIL,
              message: t("user_regsiter.error_format_email"),
            },
          ]}
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item
          label={t("user_regsiter.first_name")}
          name="firstName"
          rules={[
            {
              required: true,
              message: t("user_regsiter.error_input_firstName"),
            },
          ]}
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item
          label={t("user_regsiter.last_name")}
          name="lastName"
          rules={[
            {
              required: true,
              message: t("user_regsiter.error_input_lastName"),
            },
          ]}
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item
          label={t("user_regsiter.phone")}
          name="phone"
          rules={[
            {
              required: true,
              message: t("user_regsiter.error_input_phone"),
            },
          ]}
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item
          label={t("user_regsiter.majors")}
          name="majors"
          rules={[
            {
              required: true,
              message: t("user_regsiter.error_input_majors"),
            },
          ]}
        >
          <Select
            className="selectRegister"
            showSearch
            placeholder={t("user_regsiter.placeholder_major")}
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
          label={t("user_regsiter.student_code")}
          name="studentCode"
          rules={[
            {
              required: true,
              message: t("user_regsiter.error_input_studentCode"),
            },
          ]}
        >
          <Input className={styles.inputRegister} />
        </Form.Item>

        <Form.Item label={t("user_regsiter.role")} name="role">
          <Select
            className="selectRegister"
            onChange={handleRole}
            options={[
              { value: 1, label: "User" },
              { value: 0, label: "Admin" },
            ]}
          />
        </Form.Item>

        <Form.Item label={t("user_regsiter.office")} name="office">
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
          label={t("user_regsiter.birthday")}
          name="birthday"
          rules={[
            {
              required: true,
              message: t("user_regsiter.error_select_birthday"),
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
              {t("user_regsiter.btn_create")}
            </Button>
            <Popconfirm
              title={t("user_regsiter.question_reset_form")}
              onConfirm={onResetForm}
              okText={t("user_regsiter.btn_yes_pop")}
              cancelText={t("user_regsiter.btn_no_pop")}
            >
              <Button className="btn cancel">
                {t("user_regsiter.btn_reset")}
              </Button>
            </Popconfirm>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Register;
