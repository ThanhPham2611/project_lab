import { Form, Input, notification, Select, Space, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import ButtonCancel from "../../../components/button/buttonCancel";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ModalReason from "../../../components/modal/modalReason";
import { getCookie, STORAGEKEY } from "../../../services/cookies";
import { listRequestDevice } from "../../../store/modules/deviceRegisterSlices";
import { EStatusRegister, formatDate } from "../../../utils";

//scss
import styles from "./requestList.module.scss";

const { Search } = Input;

// socket
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
});

const DevicesResList = () => {
  //translation
  const { t } = useTranslation("common");

  const column = [
    {
      title: t("devices_request.column_email"),
      dataIndex: "creator",
    },
    {
      title: t("devices_request.column_name"),
      render: (data) => <span>{`${data.firstName} ${data.lastName}`}</span>,
    },
    {
      title: t("devices_request.column_student_code"),
      dataIndex: "studentCode",
    },
    {
      title: t("devices_request.column_device"),
      dataIndex: "devices",
      render: (data) => data.map((item) => <Tag>{item}</Tag>),
    },
    {
      title: t("devices_request.column_borrow_date"),
      dataIndex: "borrowDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: t("devices_request.column_return_date"),
      dataIndex: "returnDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: t("devices_request.column_status"),
      dataIndex: "status",
      render: (data) => (
        <span>
          {data === EStatusRegister.approve
            ? t("devices_request.name_status_approved")
            : data === EStatusRegister.notApprove
            ? t("devices_request.name_status_not_approve")
            : t("devices_request.name_status_refused")}
        </span>
      ),
    },
    {
      title: t("devices_request.column_action"),
      render: (data) => (
        <Space>
          {data.status === EStatusRegister.notApprove ? (
            <>
              <ButtonPrimary
                classNameBtn={`${
                  moment(data.borrowDate).format() <
                    moment().format(formatDate) && "disabled"
                }`}
                nameBtn={t("devices_request.btn_confirm")}
                onClickBtn={() =>
                  handlePost({ status: EStatusRegister.approve, id: data._id })
                }
              />
              <ButtonPrimary
                classNameBtn={`${
                  moment(data.borrowDate).format() <
                    moment().format(formatDate) && "disabled"
                } ${styles.btnRefuse}`}
                nameBtn={t("devices_request.btn_refuse")}
                onClickBtn={() => openModalRefuse(data._id)}
              />
            </>
          ) : (
            <ButtonCancel
              classNameBtn={`${
                moment(data.borrowDate).format() < moment().format() &&
                "disabled"
              }`}
              nameBtn={t("devices_request.btn_refund")}
              onClickBtn={() =>
                handlePost({ status: EStatusRegister.notApprove, id: data._id })
              }
            />
          )}
        </Space>
      ),
    },
  ];
  //redux
  const dispatch = useDispatch();
  const { listRequest, loading } = useSelector((state) => state.deviceRegister);
  //state
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [idModal, setIdModal] = useState("");

  useEffect(() => {
    dispatch(listRequestDevice());
  }, []);

  socket.on("success_form", () => {
    dispatch(listRequestDevice());
  });

  const onFinish = (value) => {
    dispatch(listRequestDevice(value));
  };

  const handleReset = () => {
    form.resetFields();
    dispatch(listRequestDevice());
  };

  const openModalRefuse = async (id) => {
    await setIdModal(id);
    setOpenModal(true);
  };

  const handlePost = (value) =>
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/request_device/${value.id}`,
      data: value,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie(STORAGEKEY.ACCESS_TOKEN)}`,
      },
    })
      .then(() => {
        notification.success({
          message: t("devices_request.notifi_success_status"),
        });
        dispatch(listRequestDevice());
        socket.emit("admin_call");
      })
      .catch((err) => {
        console.log(err);
      });

  return (
    <>
      <div className="wrapperPage">
        <Form form={form} onFinish={onFinish} layout="inline">
          <Form.Item name="search">
            <Search
              placeholder={t("devices_request.placeholder_search")}
              allowClear
            />
          </Form.Item>
          <Form.Item name="status">
            <Select
              className={styles.widthSelect}
              placeholder={t("devices_request.placeholder_status")}
              options={[
                {
                  value: EStatusRegister.notApprove,
                  label: t("devices_request.select_not_approve"),
                },
                {
                  value: EStatusRegister.approve,
                  label: t("devices_request.select_approve"),
                },
                {
                  value: EStatusRegister.refuse,
                  label: t("devices_request.select_refuse"),
                },
              ]}
            />
          </Form.Item>
          <Space>
            <ButtonPrimary
              classNameBtn={styles.btnSearch}
              nameBtn={t("devices_request.btn_search")}
              htmlType="submit"
            />
            <ButtonCancel
              classNameBtn={styles.btnSearch}
              nameBtn={t("devices_request.btn_cancel")}
              onClickBtn={handleReset}
            />
          </Space>
        </Form>
        <Table
          className={styles.classTable}
          columns={column}
          dataSource={listRequest}
          loading={loading}
        />
      </div>
      <ModalReason isModal={openModal} setIsModal={setOpenModal} id={idModal} />
    </>
  );
};

export default DevicesResList;
