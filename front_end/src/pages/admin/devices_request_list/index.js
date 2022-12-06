import { Form, Input, Select, Space, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import ButtonCancel from "../../../components/button/buttonCancel";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import { STORAGEKEY } from "../../../services/cookies";
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
  const column = [
    {
      title: "Email",
      dataIndex: "creator",
    },
    {
      title: "Họ và tên",
      render: (data) => <span>{`${data.firstName} ${data.lastName}`}</span>,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "studentCode",
    },
    {
      title: "Thiết bị mượn",
      dataIndex: "devices",
      render: (data) => data.map((item) => <Tag>{item}</Tag>),
    },
    {
      title: "Ngày mượn",
      dataIndex: "borrowDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: "Ngày trả",
      dataIndex: "returnDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (data) => (
        <span>
          {data === EStatusRegister.approve
            ? "Đã được duyệt"
            : data === EStatusRegister.notApprove
            ? "Chưa được duyệt"
            : "Từ chối"}
        </span>
      ),
    },
    {
      title: "Thực thi",
      render: (data) => (
        <Space>
          {data.status === EStatusRegister.notApprove ? (
            <>
              <ButtonPrimary
                classNameBtn={`${
                  moment(data.borrowDate).format() <= moment().format() &&
                  "disabled"
                }`}
                nameBtn="Duyệt đơn"
                onClickBtn={() => handlePost(EStatusRegister.approve)}
              />
              <ButtonPrimary
                classNameBtn={`${
                  moment(data.borrowDate).format() <= moment().format() &&
                  "disabled"
                } ${styles.btnRefuse}`}
                nameBtn="Hủy đơn"
                onClickBtn={() => handlePost(EStatusRegister.refuse)}
              />
            </>
          ) : (
            <ButtonCancel
              classNameBtn={`${
                moment(data.borrowDate).format() <= moment().format() &&
                "disabled"
              }`}
              nameBtn="Hoàn đơn"
              onClickBtn={() => handlePost(EStatusRegister.notApprove)}
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

  const handlePost = (status) =>
    axios({
      method: "post",
      url: ``,
      data: {
        status,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.get(STORAGEKEY.ACCESS_TOKEN)}`,
      },
    });

  return (
    <div style={{ marginBottom: 20 }}>
      <Form form={form} onFinish={onFinish} layout="inline">
        <Form.Item name="search">
          <Search placeholder="Nhập mã sinh viên" allowClear />
        </Form.Item>
        <Form.Item name="status">
          <Select
            className={styles.widthSelect}
            placeholder="Trạng thái đơn"
            options={[
              {
                value: EStatusRegister.notApprove,
                label: "Chưa được duyệt",
              },
              {
                value: EStatusRegister.approve,
                label: "Đã được duyệt",
              },
              {
                value: EStatusRegister.refuse,
                label: "Từ chối",
              },
            ]}
          />
        </Form.Item>
        <Space>
          <ButtonPrimary
            classNameBtn={styles.btnSearch}
            nameBtn="Tìm kiếm"
            htmlType="submit"
          />
          <ButtonCancel
            classNameBtn={styles.btnSearch}
            nameBtn={"Làm mới"}
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
  );
};

export default DevicesResList;
