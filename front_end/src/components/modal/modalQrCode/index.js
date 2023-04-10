import React, { useCallback, useRef } from "react";
import { Button, Modal, QRCode, Row } from "antd";
import { toPng } from 'html-to-image'

//scss
import styles from "./qrCode.module.scss";

const ModalQrCode = ({ isModal, setIsModal, valueCode, valueName }) => {
  const refQrCode = useRef()

  const onClose = () => {
    setIsModal(false);
  };

  const onClickDownload = useCallback(() => {
    if (refQrCode.current === null) {
      return
    }

    toPng(refQrCode.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${valueName}.png`
        link.href = dataUrl
        link.click()
      })
      .catch(err => {
        console.log(err)
      })
  }, [refQrCode])

  return (
    <Modal title="Qr code" open={isModal} onCancel={onClose} footer={false}>
      <Row ref={refQrCode} justify="center" className={styles.wrapperRow} align="middle">
        <QRCode value={valueCode} />
        <p style={{ textTransform: 'uppercase', fontSize: 20 }}>{valueName}</p>
        <p>{valueCode}</p>
      </Row>

      <Row justify='center' style={{ marginTop: 20 }}>
        <Button onClick={onClickDownload}>Tải xuống</Button>
      </Row>
    </Modal>
  );
};

export default ModalQrCode;
