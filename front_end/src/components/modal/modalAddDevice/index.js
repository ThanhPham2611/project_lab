import React from "react";
import { Modal, Form, Input, Row, Space, notification, Spin } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import ButtonPrimary from "../../button/buttonPrimary";
import ButtonCancel from "../../button/buttonCancel";
import { post } from "../../../services/axios/baseAPI";
import { getlistDeviceType } from "../../../store/modules/deviceRegisterSlices";

const ModalAddDevice = ({ isModal, setIsModal }) => {
  //redux
  const dispatch = useDispatch();
  //translation
  const { t } = useTranslation("common");

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
      onSuccess: () => {
        notification.success({ message: t("modal_add_device.notifi_success") });
        setIsModal(false);
        dispatch(getlistDeviceType());
      },
      onError: (error) => {
        if (error.response.status === 409) {
          notification.error({
            message: t("modal_add_device.notifi_error_exists"),
          });
        }
      },
    });

  const onClose = () => {
    form.resetFields();
    setIsModal(false);
  };

  return (
    <Modal
      title={t("modal_add_device.title_modal")}
      open={isModal}
      onCancel={onClose}
      footer={false}
    >
      <Spin spinning={isCreatingDeviceSig} tip={t("ults.spin_loading")}>
        <Form form={form} onFinish={onFinish} className="rowContent">
          <Form.Item
            label={t("modal_add_device.device_type_code")}
            name="signatureDevice"
          >
            <Input
              placeholder={t("modal_add_device.placeholder_device_type_code")}
              maxLength={3}
              showCount
            />
          </Form.Item>
          <Form.Item
            label={t("modal_add_device.device_type_name")}
            name="nameDevice"
          >
            <Input
              placeholder={t("modal_add_device.placeholder_device_type_name")}
              maxLength={16}
              showCount
            />
          </Form.Item>
          <Row justify="center">
            <Space>
              <ButtonPrimary
                nameBtn={t("modal_add_device.submit_btn")}
                htmlType="submit"
              />
              <ButtonCancel
                nameBtn={t("modal_add_device.cancel_btn")}
                onClickBtn={onClose}
              />
            </Space>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ModalAddDevice;
