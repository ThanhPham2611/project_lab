import React from "react";
import { Modal, Form, Input, Row, Space, notification, Spin } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import ButtonPrimary from "../../button/buttonPrimary";
import ButtonCancel from "../../button/buttonCancel";
import { post } from "../../../services/axios/baseAPI";
import { getlistDeviceType } from "../../../store/modules/deviceRegisterSlices";

const ModalAddDevice = ({ isModal, setIsModal }) => {
  //redux
  const dispatch = useDispatch();
  //state
  const [form] = Form.useForm();

  const onFinish = (value) => {
    const newData = {
      ...value,
      signatureDevice: value.signatureDevice.toUpperCase(),
    };
    createDeviceSig(newData);
  };

  const postCreate = (data) => post(`addDeviceSig`, data);

  const { mutate: createDeviceSig, isLoading: isCreatingDeviceSig } =
    useMutation(postCreate, {
      onSuccess: (data) => {
        notification.success({ message: "Thêm loại thiết bị thành công" });
        setIsModal(false);
        dispatch(getlistDeviceType());
      },
      onError: (error) => {
        notification.error({ message: error.response.data.message });
      },
    });

  const onClose = () => {
    form.resetFields();
    setIsModal(false);
  };

  return (
    <Modal
      title="Thêm loại thiết bị"
      open={isModal}
      onCancel={onClose}
      footer={false}
    >
      <Spin spinning={isCreatingDeviceSig} tip="Loading...">
        <Form form={form} onFinish={onFinish} className="rowContent">
          <Form.Item label="Ký hiệu thiết bị" name="signatureDevice">
            <Input
              placeholder="Nhập ký hiệu thiết bị"
              maxLength={3}
              showCount
            />
          </Form.Item>
          <Form.Item label="Tên loại thiết bị" name="nameDevice">
            <Input
              placeholder="Nhập tên loại thiết bị"
              maxLength={16}
              showCount
            />
          </Form.Item>
          <Row justify="center">
            <Space>
              <ButtonPrimary nameBtn="Tạo loại" htmlType="submit" />
              <ButtonCancel nameBtn="Hủy" onClickBtn={onClose} />
            </Space>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalAddDevice;
