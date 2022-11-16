import { Col, Modal, Row } from "antd";
import React from "react";

const ModalViewUser = ({ isModal, setIsModal }) => {
  const handleCancel = () => {
    setIsModal(false);
  };

  return (
    <Modal
      title="Thông tin người dùng"
      open={isModal}
      onCancel={handleCancel}
      footer={false}
      className="view_user"
    >
      <Row justify="space-between">
        <Col>
          <label>Tên người dùng: </label>
          <span>Thành phạm</span>
        </Col>
        <Col>
          <label>Ngày sinh: </label>
          <span>26/11/2000</span>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalViewUser;
