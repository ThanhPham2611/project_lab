import { Modal, Row } from "antd";
import React, { useState } from "react";
import QrReader from "react-qr-scanner";

const ModalCamera = ({ visiable, setVisiable }) => {
  //state
  const [dataCamera, setDataCamera] = useState("");

  return (
    <Modal open={visiable} footer={false}>
      <Row>
        <QrReader
          facingMode="front"
          onScan={(data) => {
            if (data) {
              setDataCamera(data.text);
              setVisiable(false);
            }
          }}
        />
      </Row>
    </Modal>
  );
};

export default ModalCamera;
