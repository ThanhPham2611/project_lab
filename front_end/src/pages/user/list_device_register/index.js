import React, { useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useTranslation } from "react-i18next";

import ButtonPrimary from "../../../components/button/buttonPrimary";
import {
  EStatusRegister,
  formatDate,
  listStatusRegister,
} from "../../../utils";
import { deviceRegister } from "../../../store/modules/deviceRegisterSlices";

//scss
import styles from "./list_device.module.scss";

// socket
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
});

const ListDeviceRegister = () => {
  //translation
  const { t } = useTranslation("common");

  const column = [
    {
      title: "STT",
      dataIndex: "index",
      render: (key, _, index) => <span>{index + 1}</span>,
    },
    {
      title: t("devices_request_user.column_student_code"),
      dataIndex: "studentCode",
    },
    {
      title: t("devices_request_user.column_device"),
      dataIndex: "devices",
      render: (data) => data.map((item) => <Tag>{item}</Tag>),
    },
    {
      title: t("devices_request_user.column_borrow_date"),
      dataIndex: "borrowDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: t("devices_request_user.column_return_date"),
      dataIndex: "returnDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: t("devices_request_user.column_status"),
      dataIndex: "status",
      render: (data) => (
        <Tag
          color={
            data === EStatusRegister.notApprove
              ? "#2db7f5"
              : data === EStatusRegister.approve
              ? "#87d068"
              : "#cd201f"
          }
        >
          {data === EStatusRegister.notApprove
            ? t("devices_request_user.name_status_approved")
            : data === EStatusRegister.approve
            ? t("devices_request_user.name_status_not_approve")
            : t("devices_request_user.name_status_refused")}
        </Tag>
      ),
    },
    {
      title: t("devices_request_user.column_action"),
      render: (key) => (
        <ButtonPrimary
          classNameBtn={`${
            moment(key.borrowDate).format() <= moment().format() && "disabled"
          }`}
          nameBtn={t("devices_request_user.btn_edit")}
        />
      ),
    },
  ];

  //redux
  const dispatch = useDispatch();
  const { listDeviceRegister, loading } = useSelector(
    (state) => state.deviceRegister
  );

  useEffect(() => {
    dispatch(deviceRegister());
  }, []);

  const [form] = Form.useForm();

  socket.on("user_claim", () => {
    dispatch(deviceRegister());
  });

  const onFinish = (value) => {
    dispatch(deviceRegister(value));
  };

  const handleReset = () => {
    form.resetFields();
    dispatch(deviceRegister());
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={[16, 16]} className={styles.row}>
          <Col xxl={4}>
            <Form.Item name="dateSearch">
              <DatePicker
                className={styles.widthFull}
                placeholder={t("devices_request_user.placeholder_date")}
              />
            </Form.Item>
          </Col>
          <Col xxl={4}>
            <Form.Item name="status">
              <Select
                placeholder={t("devices_request_user.placeholder_status")}
                options={listStatusRegister}
                className={styles.widthFull}
              />
            </Form.Item>
          </Col>
          <Col>
            <Space>
              <Button
                className={`btn primary ${styles.btnSearch}`}
                htmlType="submit"
              >
                {t("devices_request_user.btn_search")}
              </Button>
              <Button
                className={`btn cancel ${styles.btnSearch}`}
                onClick={handleReset}
              >
                {t("devices_request_user.btn_resest")}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table
        columns={column}
        loading={loading}
        dataSource={listDeviceRegister}
      />
    </div>
  );
};

export default ListDeviceRegister;
