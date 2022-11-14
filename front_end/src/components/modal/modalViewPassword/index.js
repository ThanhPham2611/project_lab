import { Modal, Result } from "antd";
import React from "react";

const ModalViewPassword = ({ isModal, setIsModal, valueReset }) => {
  const handleCancel = () => {
    setIsModal(false);
  };

  return (
    <Modal open={isModal} onCancel={handleCancel} onOk={handleCancel}>
      <Result
        status="success"
        title={`Email: ${valueReset.emailReset} Password: ${valueReset.passwordReset}`}
      />
    </Modal>
  );
};

export default ModalViewPassword;
