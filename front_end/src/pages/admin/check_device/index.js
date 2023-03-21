import { Col, Divider, Input, Modal, notification, Row, Spin } from "antd";
import React, { useState } from "react";
import {
  CameraOutlined,
  CloseOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import QrReader from "react-qr-scanner";
import moment from "moment";
import { useTranslation } from "react-i18next";

//local
import { get, patch } from "../../../services/axios/baseAPI";
import { detailLocationDevice, formatDate } from "../../../utils";
import ButtonPrimary from "../../../components/button/buttonPrimary";

//scss
import styles from "./checkDevice.module.scss";
import ModalBorrowDevice from "../../../components/modal/modalBorrowDevice";
import { useHistory } from "react-router-dom";

const { Search } = Input;

const { confirm } = Modal;

const CheckDevice = () => {
  //translation
  const { t } = useTranslation("common");
  //state
  const history = useHistory();
  const [onCamera, setOnCamera] = useState(false);
  const [dataValue, setDataValue] = useState({});
  const [textValue, setTextValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModalBorrow, setOpenModalBorrow] = useState(false);

  const handleCamera = () => {
    setTextValue("");
    setOnCamera(true);
  };

  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,

      onOk() {
        patch(`editDevice/${dataValue.dataInfo._id}`, {
          userId: dataValue.dataInfo.userId,
          borrowDate: moment().format(),
          status: 0,
        })
          .then(() => {
            notification.success({ message: "Thu hồi thành công" });
            history.push("management-devices");
          })
          .catch(() => {
            notification.error({ message: "Lỗi server" });
          });
      },
      onCancel() {
        return;
      },
    });
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
              onScan={(data) => {
                if (data) {
                  setTextValue(data.text);
                  handlePostCode(data.text);
                  setOnCamera(false);
                  return;
                }
              }}
              onError={() => {
                notification.error({
                  message: "Error device or not device support camera",
                });
                setOnCamera(false);
              }}
              facingMode="front"
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
              constraints={{ facingMode: "environment" }}
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
                <span>{dataValue.dataInfo.deviceName}</span>
              </Col>
            </Row>

            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.device_code")}: </label>
              </Col>
              <Col>
                <span>{dataValue.dataInfo.deviceCode}</span>
              </Col>
            </Row>

            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.device_location")}: </label>
              </Col>
              <Col>
                <span>
                  {dataValue.dataInfo.deviceLocation
                    ? detailLocationDevice(
                      dataValue.dataInfo.deviceLocation[0],
                      dataValue.dataInfo.deviceLocation[1]
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
                <span>{dataValue.dataInfo.deviceType}</span>
              </Col>
            </Row>
            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.import_date")}: </label>
              </Col>
              <Col>
                <span>
                  {moment(dataValue.dataInfo.importDate).format(formatDate)}
                </span>
              </Col>
            </Row>
            <Row className={styles.rowInfo}>
              <Col xl={5} xxl={10}>
                <label>{t("check_device.status")}: </label>
              </Col>
              <Col>
                <span>
                  {dataValue.dataInfo.status === 0
                    ? t("check_device.status_not_borrow")
                    : t("check_device.status_borrow")}
                </span>
              </Col>
            </Row>
            {dataValue.dataInfo.status === 1 && (
              <>
                <Row className={styles.rowInfo}>
                  <Col xl={5} xxl={10}>
                    <label>{t("check_device.borrower")}: </label>
                  </Col>
                  <Col>
                    <span>
                      {`${dataValue.nameUser.firstName} ${dataValue.nameUser.lastName}`}
                    </span>
                  </Col>
                </Row>
                <Row className={styles.rowInfo}>
                  <Col xl={5} xxl={10}>
                    <label>{t("check_device.student_code")}: </label>
                  </Col>
                  <Col>
                    <span>{dataValue.nameUser.studentCode}</span>
                  </Col>
                </Row>
              </>
            )}

            <Row justify="center" className={styles.rowBtn}>
              {dataValue.dataInfo.status === 0 ? (
                <ButtonPrimary
                  nameBtn={t("check_device.btn_lend")}
                  onClickBtn={() => setOpenModalBorrow(true)}
                />
              ) : (
                <ButtonPrimary
                  nameBtn={t("check_device.btn_eviction")}
                  onClickBtn={showConfirm}
                />
              )}
            </Row>
          </div>
        </Row>
      )}
      <ModalBorrowDevice
        isModal={openModalBorrow}
        setIsModal={setOpenModalBorrow}
        dataValue={dataValue.dataInfo}
      />
    </Spin>
  );
};

export default CheckDevice;
