import React from "react";
import { Modal, QRCode, Row } from "antd";

//scss
import styles from "./qrCode.module.scss";

const ModalQrCode = ({ isModal, setIsModal, valueCode }) => {
  const onClose = () => {
    setIsModal(false);
  };

  return (
    <Modal title="Qr code" open={isModal} onCancel={onClose} footer={false}>
      <Row justify="center" className={styles.wrapperRow} align="middle">
        <QRCode value={valueCode} />
        <p>{valueCode}</p>
      </Row>
    </Modal>
  );
};

export default ModalQrCode;
