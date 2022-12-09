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
  const column = [
    {
      title: "STT",
      dataIndex: "index",
      render: (key, _, index) => <span>{index + 1}</span>,
    },
    {
      title: "Student code",
      dataIndex: "studentCode",
    },
    {
      title: "Device",
      dataIndex: "devices",
      render: (data) => data.map((item) => <Tag>{item}</Tag>),
    },
    {
      title: "Borrow date",
      dataIndex: "borrowDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: "Return date",
      dataIndex: "returnDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: "Status",
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
            ? "Not approve"
            : data === EStatusRegister.approve
            ? "Approve"
            : "Refuse"}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (key) => (
        <ButtonPrimary
          classNameBtn={`${
            moment(key.borrowDate).format() <= moment().format() && "disabled"
          }`}
          nameBtn="Edit"
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
              <DatePicker className={styles.widthFull} />
            </Form.Item>
          </Col>
          <Col xxl={4}>
            <Form.Item name="status">
              <Select
                placeholder="Status"
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
                Search
              </Button>
              <Button
                className={`btn cancel ${styles.btnSearch}`}
                onClick={handleReset}
              >
                Reset
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
