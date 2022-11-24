import { Button, Form, Input, Popconfirm, Select, Space, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

//local
import { allUsers, getDetailUser } from "../../../store/modules/usersSlices";
import ButtonCancel from "../../../components/button/buttonCancel";
import { post } from "../../../services/axios/baseAPI";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import { getCookie, STORAGEKEY } from "../../../services/cookies";
import ModalViewPassword from "../../../components/modal/modalViewPassword";
import ModalViewUser from "../../../components/modal/modalViewUser";
import { EOffice, listOffice } from "../../../utils/role";

import styles from "./listUser.module.scss";

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
        <span>
          {key === EOffice.admin
            ? t("list_user.table_admin")
            : key === EOffice.student
            ? t("list_user.table_student")
            : t("list_user.table_teacher")}
        </span>
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
            <ButtonCancel
              nameBtn={t("list_user.btn_detail")}
              onClickBtn={() => handleDetail(key.key)}
            />
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
  const [openModalView, setOpenModalView] = useState(false);

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

  const handleReset = () => {
    dispatch(allUsers());
    form.resetFields();
  };

  const handleDetail = (id) => {
    setOpenModalView(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/getInfoUser`,
        {
          idUser: id,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie(STORAGEKEY.ACCESS_TOKEN)}`,
          },
        }
      )
      .then((res) => {
        const { data } = res;
        dispatch(getDetailUser(data.userInfo));
      })
      .catch((err) => {
        console.log(err);
      });
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
              placeholder={t("list_user.placeholder_input")}
              allowClear
              style={{ width: 300 }}
            />
          </Form.Item>

          <Form.Item name="office">
            <Select
              placeholder={t("list_user.placeholder_office")}
              style={{ width: 150 }}
              options={listOffice.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <ButtonPrimary
                classNameBtn={styles.btnSearch}
                nameBtn={t("list_user.btn_search")}
                htmlType="submit"
              />
              <ButtonCancel
                classNameBtn={styles.btnSearch}
                nameBtn={t("list_user.btn_rest_form")}
                onClickBtn={handleReset}
              />
            </Space>
          </Form.Item>
        </Form>
      </div>
      <Table
        rowClassName={(record) =>
          record.office === EOffice.admin ? `${styles.rowAdmin}` : ""
        }
        columns={columns}
        dataSource={dataList}
        bordered
        loading={loading}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 7,
        }}
      />
      <ModalViewPassword
        isModal={openModal}
        setIsModal={setOpenModal}
        valueReset={valueReset}
      />
      <ModalViewUser isModal={openModalView} setIsModal={setOpenModalView} />
    </>
  );
};

export default ListUsers;
