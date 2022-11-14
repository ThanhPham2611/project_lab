import {
  Button,
  Form,
  Input,
  notification,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

//local
import { allUsers } from "../../../store/modules/usersSlices";
import ButtonCancel from "../../../components/button/buttonCancel";
import { post } from "../../../services/axios/baseAPI";
import ButtonPrimary from "../../../components/button/buttonPrimary";

import styles from "./listUser.module.scss";
import { useMutation } from "@tanstack/react-query";
import ModalViewPassword from "../../../components/modal/modalViewPassword";

const { Search } = Input;

const ListUsers = () => {
  //translation
  const { t } = useTranslation("common");

  //format date
  const formatDate = "YYYY-MM-DD";
  const columns = [
    {
      title: t("list_user.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("list_user.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("list_user.student_code"),
      dataIndex: "studentCode",
      key: "studentCode",
    },
    {
      title: t("list_user.phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("list_user.office"),
      dataIndex: "office",
      key: "office",
      render: (key) => (
        <span>{key === 0 ? "Admin" : key === 1 ? "User" : "Teacher"}</span>
      ),
    },
    {
      title: t("list_user.birthday"),
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: t("list_user.action"),
      key: "action",
      render: (key) => {
        return (
          <Space>
            <Popconfirm
              title={t("list_user.pop_conf_title")}
              okText={t("list_user.pop_btn_ok")}
              cancelText={t("list_user.pop_btn_cancel")}
              disabled={key.office === 0}
              onConfirm={() => confirmReset(key.email)}
            >
              <Button
                className={`btn primary ${key.office === 0 && "disabled"}`}
              >
                {t("list_user.btn_resetpass")}
              </Button>
            </Popconfirm>
            <ButtonCancel nameBtn={t("list_user.btn_detail")} />
          </Space>
        );
      },
    },
  ];

  //redux
  const dispatch = useDispatch();
  const { listAllUser, loading } = useSelector((state) => state.userInfo);

  const dataList = listAllUser.map((item) => {
    return {
      key: item._id,
      name: `${item.firstName} ${item.lastName}`,
      email: item.email,
      studentCode: item.studentCode,
      phone: `0${item.phone}`,
      office: item.office,
      birthday: moment(item.birthday).format(formatDate),
    };
  });

  //state
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [valueReset, setValueReset] = useState("");

  useEffect(() => {
    dispatch(allUsers());
  }, []);

  const onFinish = (value) => {
    dispatch(allUsers(value));
  };

  const confirmReset = (email) => {
    resetUser({ email });
    setOpenModal(true);
  };

  const postEmailConfirm = (data) => post(`adminReset`, data);

  const { mutate: resetUser } = useMutation(postEmailConfirm, {
    onSuccess: (data) => {
      setValueReset(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Form form={form} onFinish={onFinish} layout="inline">
          <Form.Item name="inputSearch">
            <Search
              placeholder="Input email or student code"
              allowClear
              style={{ width: 300 }}
            />
          </Form.Item>

          <Form.Item name="office">
            <Select
              placeholder="Office"
              style={{ width: 150 }}
              options={[
                {
                  value: 0,
                  label: "Admin",
                },
                {
                  value: 1,
                  label: "User",
                },
                {
                  value: 2,
                  label: "Teacher",
                },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <ButtonPrimary
                classNameBtn={styles.btnSearch}
                nameBtn="Search"
                htmlType="submit"
              />
              <ButtonCancel
                classNameBtn={styles.btnSearch}
                nameBtn="Reset form"
                onClickBtn={() => form.resetFields()}
              />
            </Space>
          </Form.Item>
        </Form>
      </div>
      <Table
        columns={columns}
        dataSource={dataList}
        bordered
        loading={loading}
      />
      <ModalViewPassword
        isModal={openModal}
        setIsModal={setOpenModal}
        valueReset={valueReset}
      />
    </>
  );
};

export default ListUsers;
