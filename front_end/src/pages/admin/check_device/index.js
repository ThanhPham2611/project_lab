import { Col, Divider, Input, notification, Row, Spin } from "antd";
import React, { useState } from "react";
import { CameraOutlined, CloseOutlined } from "@ant-design/icons";
import QrReader from "react-qr-scanner";
import moment from "moment";
import { useTranslation } from "react-i18next";

//local
import { get } from "../../../services/axios/baseAPI";
import { detailLocationDevice, formatDate } from "../../../utils";
import ButtonPrimary from "../../../components/button/buttonPrimary";

//scss
import styles from "./checkDevice.module.scss";
import ModalBorrowDevice from "../../../components/modal/modalBorrowDevice";

const { Search } = Input;

const CheckDevice = () => {
  //translation
  const { t } = useTranslation("common");
  //state
  const [onCamera, setOnCamera] = useState(false);
  const [dataValue, setDataValue] = useState({});
  const [textValue, setTextValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModalBorrow, setOpenModalBorrow] = useState(false);

  const handleCamera = () => {
    setTextValue("");
    setOnCamera(true);
  };

  const handlePostCode = (code) => {
    if (!code) return;
    setLoading(true);
    get(`getInfoDevice`, { deviceCode: code })
      .then((res) => {
        setTextValue("1");
        const { data } = res;
        setLoading(false);
        setDataValue(data);
        notification.success({ message: t("check_device.notifi_success") });
      })
      .catch(() => {
        setLoading(false);
        notification.error({ message: t("check_device.notifi_error") });
      });
  };

  return (
    <Spin spinning={loading} tip={t("ults.spin_loading")}>
      <h1 className="titleHeaderPage">{t("check_device.title_header")}</h1>
      <Divider />
      <Row justify="center" className="rowContent">
        <Col xs={24} xxl={8}>
          <Search
            placeholder={t("check_device.placeholder_search")}
            allowClear
            suffix={
              <CameraOutlined
                className={styles.iconSuffix}
                onClick={handleCamera}
              />
            }
            onSearch={handlePostCode}
          />
        </Col>
      </Row>

      {onCamera && (
        <div>
          <Row
            justify="center"
            style={{ flexDirection: "column" }}
            className={`${styles.wrapperCamera} rowContent`}
          >
            <CloseOutlined
              style={{ fontSize: 25 }}
              onClick={() => setOnCamera(false)}
            />
            <QrReader
              facingMode="front"
              onScan={(data) => {
                if (data) {
                  setTextValue(data.text);
                  handlePostCode(data.text);
                  setOnCamera(false);
                  return;
                }
              }}
            />
          </Row>

          <Row
            justify="center"
            align="middle"
            className={styles.wrapperCameraMobile}
          >
            <CloseOutlined
              style={{ fontSize: 25 }}
              onClick={() => setOnCamera(false)}
            />
            <QrReader
              facingMode="rear"
              onScan={(data) => {
                if (data) {
                  setTextValue(data.text);
                  handlePostCode(data.text);
                  setOnCamera(false);
                  return;
                }
              }}
              className={styles.camera}
            />
          </Row>
        </div>
      )}
      {textValue && (
        <Row justify="center" className={styles.wrapperDetail}>
          <div style={{ width: "30%" }}>
            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.device_name")}: </label>
              </Col>
              <Col>
                <span>{dataValue.deviceName}</span>
              </Col>
            </Row>

            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.device_code")}: </label>
              </Col>
              <Col>
                <span>{dataValue.deviceCode}</span>
              </Col>
            </Row>

            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.device_location")}: </label>
              </Col>
              <Col>
                <span>
                  {dataValue.deviceLocation
                    ? detailLocationDevice(
                        dataValue.deviceLocation[0],
                        dataValue.deviceLocation[1]
                      )
                    : ""}
                </span>
              </Col>
            </Row>
            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.device_type")}: </label>
              </Col>
              <Col>
                <span>{dataValue.deviceType}</span>
              </Col>
            </Row>
            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.import_date")}: </label>
              </Col>
              <Col>
                <span>{moment(dataValue.importDate).format(formatDate)}</span>
              </Col>
            </Row>
            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.status")}: </label>
              </Col>
              <Col>
                <span>
                  {dataValue.status === 0
                    ? t("check_device.status_not_borrow")
                    : t("check_device.status_borrow")}
                </span>
              </Col>
            </Row>
            <Row justify="center" className={styles.rowBtn}>
              {dataValue.status === 0 ? (
                <ButtonPrimary
                  nameBtn={t("check_device.btn_lend")}
                  onClickBtn={() => setOpenModalBorrow(true)}
                />
              ) : (
                <ButtonPrimary nameBtn={t("check_device.btn_eviction")} />
              )}
            </Row>
          </div>
        </Row>
      )}
      <ModalBorrowDevice
        isModal={openModalBorrow}
        setIsModal={setOpenModalBorrow}
        dataValue={dataValue}
      />
    </Spin>
  );
};

export default CheckDevice;
