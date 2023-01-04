import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//local
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";
import { formatDate } from "../../../utils";
import { getlistDevice } from "../../../store/modules/deviceRegisterSlices";

// scss
import styles from "./deviceManagement.module.scss";
import ModalQrCode from "../../../components/modal/modalQrCode";

const { Search } = Input;

const DeviceManagement = () => {
  const column = [
    {
      title: "Device name",
      dataIndex: "deviceName",
      key: "deviceName",
      render: (data) => <span>{data}</span>,
    },
    {
      title: "Device code",
      dataIndex: "deviceCode",
      key: "deviceCode",
    },
    {
      title: "Device type",
      dataIndex: "deviceType",
      key: "deviceType",
    },
    {
      title: "Import date",
      dataIndex: "importDate",
      key: "importDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Action",
      width: 300,
      render: (key) => (
        <Space>
          <ButtonPrimary nameBtn="Borrow logs" />
          <ButtonPrimary
            nameBtn="Qr code"
            onClickBtn={() => handleOpenModal(key.deviceCode)}
          />
        </Space>
      ),
    },
  ];

  //redux
  const dispatch = useDispatch();
  const { listAllUser } = useSelector((state) => state.userInfo);
  const { listDevice } = useSelector((state) => state.deviceRegister);

  // state
  const [form] = Form.useForm();
  const [openModalQr, setOpenModalQr] = useState(false);
  const [valueQr, setValueQr] = useState("");

  useEffect(() => {
    dispatch(getlistDevice());
  }, []);

  const handleOpenModal = (value) => {
    setOpenModalQr(true);
    setValueQr(value);
  };

  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <div>
      <h1 className="titleHeaderPage">List device</h1>
      <Divider />
      <Form form={form} onFinish={onFinish} className="fullWidth">
        <Row gutter={[16, 16]}>
          <Col xxl={4}>
            <Form.Item name="deviceCode">
              <Search placeholder="Fill device code" />
            </Form.Item>
          </Col>

          <Col xxl={3}>
            <Form.Item name="deviceType">
              <Select
                placeholder="Device type"
                options={[
                  {
                    value: "AC",
                    label: "Accessories",
                  },
                  {
                    value: "LE",
                    label: "Led",
                  },
                  {
                    value: "BA",
                    label: "Battery",
                  },
                ]}
                className="fullWidth"
              />
            </Form.Item>
          </Col>

          <Col xxl={3}>
            <Form.Item name="manager">
              <Select
                showSearch
                className="fullWidth"
                placeholder="manager"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={listAllUser.map((item) => {
                  return {
                    value: item._id,
                    label: `${item.firstName} ${item.lastName}`,
                  };
                })}
              />
            </Form.Item>
          </Col>

          <Col>
            <Space>
              <ButtonPrimary
                classNameBtn="btnSearchTable"
                nameBtn="Search"
                htmlType="submit"
              />
              <ButtonCancel classNameBtn="btnSearchTable" nameBtn="Reset" />
            </Space>
          </Col>
        </Row>
      </Form>

      <Table columns={column} dataSource={listDevice} />
      <ModalQrCode
        valueCode={valueQr}
        setIsModal={setOpenModalQr}
        isModal={openModalQr}
      />
    </div>
  );
};

export default DeviceManagement;
