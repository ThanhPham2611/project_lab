import React from "react";
import { DatePicker, Form, Modal, notification, Space } from "antd";
import { useDispatch } from "react-redux";
import moment from "moment";

import ButtonPrimary from "../../button/buttonPrimary";
import ButtonCancel from "../../button/buttonCancel";
import { patch } from "../../../services/axios/baseAPI";
import { deviceRegister } from "../../../store/modules/deviceRegisterSlices";

import styles from "./extend.module.scss";

const ModalExtend = ({ visiable, setVisiale, id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onCancel = () => {
    setVisiale(false);
  };

  const handleUpdateForm = async (data) => {
    await patch(`patchRegister/${id}`, data)
      .then(() => {
        setVisiale(false);
        notification.success({ message: "Đã gửi đơn gia hạn" });
        dispatch(deviceRegister());
      })
      .catch((err) => {
        notification.error({ message: "Đã có lỗi xảy ra" });
      });
  };

  return (
    <Modal
      title="Gia hạn ngày trả"
      open={visiable}
      onCancel={onCancel}
      footer={false}
    >
      <Form form={form} onFinish={handleUpdateForm}>
        <Form.Item name="returnDate">
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(current) => {
              return moment().subtract(0, "days") > current;
            }}
          />
        </Form.Item>
        <Space className={styles.buttonContainer}>
          <ButtonPrimary nameBtn="Gia hạn" htmlType="submit" />
          <ButtonCancel nameBtn="Hủy" onClickBtn={onCancel} />
        </Space>
      </Form>
    </Modal>
  );
};

export default ModalExtend;
