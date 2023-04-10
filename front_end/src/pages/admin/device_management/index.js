import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { CameraOutlined } from "@ant-design/icons";

//local
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";
import { formatDateHour } from "../../../utils";
import {
  getlistDevice,
  getlistDeviceType,
} from "../../../store/modules/deviceRegisterSlices";
import ModalQrCode from "../../../components/modal/modalQrCode";
import ModalBorrowLog from "../../../components/modal/modalBorrowLog";
import { EBorrow } from "../../../utils/role";
import ModalCamera from "../../../components/modal/modalCamera";
import ModalInfoDevice from "../../../components/modal/modalInfoDevice";

const { Search } = Input;

const DeviceManagement = () => {
  //translation
  const { t } = useTranslation("common");

  const column = [
    {
      title: t("device_management.column_device_name"),
      dataIndex: "deviceName",
      key: "deviceName",
      render: (data) => <span>{data}</span>,
    },
    {
      title: t("device_management.column_device_code"),
      dataIndex: "deviceCode",
      key: "deviceCode",
    },
    {
      title: t("device_management.column_device_type"),
      dataIndex: "deviceType",
      key: "deviceType",
    },
    {
      title: t("device_management.column_import_date"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => <span>{moment(data).format(formatDateHour)}</span>,
    },
    {
      title: t("device_management.column_manager"),
      dataIndex: "manager",
      key: "manager",
      render: (data) => (
        <span style={{ textTransform: "capitalize" }}>{data}</span>
      ),
    },
    {
      title: t("device_management.column_status"),
      dataIndex: "status",
      key: "status",
      render: (data) => (
        <Tag color={EBorrow.borrowed === data ? "green" : "blue"}>
          {EBorrow.borrowed === data
            ? t("device_management.status_borrow")
            : t("device_management.status_not_borrow")}
        </Tag>
      ),
    },
    {
      title: t("device_management.column_action"),
      width: 300,
      key: "action",
      render: (key) => (
        <Space>
          <ButtonPrimary
            nameBtn={t("device_management.btn_action_borrow_log")}
            onClickBtn={() => handleModalLog(key.deviceCode)}
          />
          <ButtonPrimary
            nameBtn={t("device_management.btn_action_qr_code")}
            onClickBtn={() => handleOpenModal(key)}
          />
        </Space>
      ),
    },
  ];

  //redux
  const dispatch = useDispatch();
  const { listAllUser } = useSelector((state) => state.userInfo);
  const { listDevice, listDeviceType } = useSelector(
    (state) => state.deviceRegister
  );

  // state
  const [form] = Form.useForm();
  const [openModalQr, setOpenModalQr] = useState(false);
  const [valueQr, setValueQr] = useState("");
  const [openModalLog, setOpenModalLog] = useState(false);
  const [onCamera, setOnCamera] = useState(false);
  const [modalInfo, setModalInfo] = useState(false)
  const [valueDevice, setValueDevice] = useState('')
  const [valueName, setValueName] = useState('')

  useEffect(() => {
    dispatch(getlistDevice());
    dispatch(getlistDeviceType());
  }, []);

  const handleOpenModal = (value) => {
    setOpenModalQr(true);
    setValueQr(value.deviceCode);
    setValueName(value.deviceName)
  };

  const handleModalLog = (value) => {
    setOpenModalLog(true);
    setValueQr(value);
  };

  const onFinish = (value) => {
    dispatch(getlistDevice(value));
  };

  const onCancel = () => {
    dispatch(getlistDevice());
    form.resetFields();
  };

  const handleCamera = () => {
    setOnCamera(true);
  };

  return (
    <div>
      <h1 className="titleHeaderPage">{t("device_management.title_header")}</h1>
      <Divider />
      <Form form={form} onFinish={onFinish} className="fullWidth">
        <Row gutter={[16, 16]}>
          <Col xxl={4}>
            <Form.Item name="deviceCode">
              <Search
                placeholder={t("device_management.placeholder_search")}
                suffix={
                  <CameraOutlined
                    style={{ fontSize: 18 }}
                    onClick={handleCamera}
                  />
                }
              />
            </Form.Item>
          </Col>

          <Col xxl={3}>
            <Form.Item name="deviceType">
              <Select
                placeholder={t("device_management.placeholder_device_type")}
                showSearch
                className="fullWidth"
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
                options={listDeviceType.map((item) => {
                  return {
                    value: item.signatureDevice,
                    label: item.nameDevice,
                  };
                })}
              />
            </Form.Item>
          </Col>

          <Col xxl={3}>
            <Form.Item name="manager">
              <Select
                showSearch
                className="fullWidth"
                placeholder={t("device_management.placeholder_manager")}
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
                nameBtn={t("device_management.btn_search")}
                htmlType="submit"
              />
              <ButtonCancel
                classNameBtn="btnSearchTable"
                nameBtn={t("device_management.btn_reset")}
                onClickBtn={onCancel}
              />
            </Space>
          </Col>
        </Row>
      </Form>

      <Table
        columns={column}
        dataSource={listDevice}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              setModalInfo(true)
              setValueDevice(record.deviceCode)
            }
          }
        }}
      />
      <ModalQrCode
        valueName={valueName}
        valueCode={valueQr}
        setIsModal={setOpenModalQr}
        isModal={openModalQr}
      />
      <ModalBorrowLog
        isModal={openModalLog}
        setIsModal={setOpenModalLog}
        deviceCode={valueQr}
      />
      <ModalInfoDevice visiable={modalInfo} deviceCode={valueDevice} setVisiable={setModalInfo} />
      <ModalCamera visiable={onCamera} setVisiable={setOnCamera} />
    </div>
  );
};

export default DeviceManagement;
