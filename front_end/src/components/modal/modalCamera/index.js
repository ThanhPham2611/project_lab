import { Modal, notification, Row } from "antd";
import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { useDispatch } from "react-redux";

import { getlistDevice } from "../../../store/modules/deviceRegisterSlices";

const ModalCamera = ({ visiable, setVisiable }) => {
  //redux
  const dispatch = useDispatch();

  const handleCancel = () => {
    setVisiable(false);
  };

  const handleSubmit = (deviceCode) => {
    dispatch(getlistDevice({ deviceCode: deviceCode }));
  };

  return (
    <Modal open={visiable} footer={false} onCancel={handleCancel}>
      <Row>
        <QrReader
          facingMode="front"
          legacyMode={true}
          onScan={(data) => {
            if (data) {
              handleSubmit(data.text);
              setVisiable(false);
            }
          }}
          onError={(err) => {
            console.log("err camera:::", err);
            notification.error({ message: err });
          }}
        />
      </Row>
    </Modal>
  );
};

export default ModalCamera;
