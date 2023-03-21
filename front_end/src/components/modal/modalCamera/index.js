import React from "react";
import { Modal, notification } from "antd";
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
    <Modal open={visiable} footer={false} onCancel={handleCancel} destroyOnClose>
      {visiable && <QrReader
        facingMode="front"
        legacyMode={true}
        onScan={(data) => {
          console.log('okoekoek', data)
          if (data) {
            handleSubmit(data.text);
            setVisiable(false);
            return;
          }
        }}
        onError={() => {
          notification.error({ message: 'Thiết bị không hỗ trợ hoặc không tìm thấy thiết bị' });
        }}
        style={{ width: '100%', padding: 20 }}
      />}
    </Modal>
  );
};

export default ModalCamera;
