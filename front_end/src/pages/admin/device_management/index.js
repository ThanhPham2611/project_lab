import React, { useEffect, useState } from "react";
import { Col, Divider, Form, Input, Row, Select, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//local
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";
import { formatDate } from "../../../utils";
import { getlistDevice } from "../../../store/modules/deviceRegisterSlices";
import ModalQrCode from "../../../components/modal/modalQrCode";
import ModalBorrowLog from "../../../components/modal/modalBorrowLog";
import { useTranslation } from "react-i18next";

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
      dataIndex: "importDate",
      key: "importDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: t("device_management.column_manager"),
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: t("device_management.column_action"),
      width: 300,
      render: (key) => (
        <Space>
          <ButtonPrimary
            nameBtn={t("device_management.btn_action_borrow_log")}
            onClickBtn={() => handleModalLog(key.deviceCode)}
          />
          <ButtonPrimary
            nameBtn={t("device_management.btn_action_qr_code")}
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
  const [openModalLog, setOpenModalLog] = useState(false);

  useEffect(() => {
    dispatch(getlistDevice());
  }, []);

  const handleOpenModal = (value) => {
    setOpenModalQr(true);
    setValueQr(value);
  };

  const handleModalLog = (value) => {
    setOpenModalLog(true);
    setValueQr(value);
  };

  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <div>
      <h1 className="titleHeaderPage">{t("device_management.title_header")}</h1>
      <Divider />
      <Form form={form} onFinish={onFinish} className="fullWidth">
        <Row gutter={[16, 16]}>
          <Col xxl={4}>
            <Form.Item name="deviceCode">
              <Search placeholder={t("device_management.placeholder_search")} />
            </Form.Item>
          </Col>

          <Col xxl={3}>
            <Form.Item name="deviceType">
              <Select
                placeholder={t("device_management.placeholder_device_type")}
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
              />
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
      <ModalBorrowLog
        isModal={openModalLog}
        setIsModal={setOpenModalLog}
        deviceCode={valueQr}
      />
    </div>
  );
};

export default DeviceManagement;
