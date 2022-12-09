import { Col, Modal, Row, Input, Space, notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

//local
import { listRequestDevice } from "../../../store/modules/deviceRegisterSlices";
import { EStatusRegister } from "../../../utils";
import { getCookie, STORAGEKEY } from "../../../services/cookies";
import ButtonCancel from "../../button/buttonCancel";
import ButtonPrimary from "../../button/buttonPrimary";

//scss
import styles from "./reason.module.scss";

const { TextArea } = Input;

// socket
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
});

const ModalReason = ({ isModal, setIsModal, id }) => {
  //redux
  const dispatch = useDispatch();

  const [valueReason, setValueReason] = useState();
  const handleCancel = () => {
    setIsModal(false);
  };

  const handleSubmit = () => {
    if (valueReason) {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}/request_device/${id}`,
        data: {
          status: EStatusRegister.refuse,
          reason: valueReason,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(STORAGEKEY.ACCESS_TOKEN)}`,
        },
      })
        .then(() => {
          notification.success({ message: "Từ chối đơn thành công" });
          dispatch(listRequestDevice());
          socket.emit("admin_call");
          setIsModal(false);
          setValueReason("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      notification.error({ message: "Bạn cần điền lý do" });
    }
  };

  return (
    <Modal
      title="Modal refuse"
      open={isModal}
      onCancel={handleCancel}
      footer={false}
    >
      <Row className={styles.rowContent}>
        <Col xxl={4}>
          <label>Reason: </label>
        </Col>
        <Col xxl={20}>
          <TextArea
            value={valueReason}
            onChange={(e) => setValueReason(e.target.value)}
            rows={4}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Space>
          <ButtonPrimary nameBtn="submit" onClickBtn={handleSubmit} />
          <ButtonCancel nameBtn="Cancel" />
        </Space>
      </Row>
    </Modal>
  );
};

export default ModalReason;
