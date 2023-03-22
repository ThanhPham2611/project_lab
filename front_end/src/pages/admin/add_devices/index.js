import {
  Row,
  Col,
  Form,
  Input,
  Spin,
  Divider,
  Space,
  Select,
  Cascader,
  notification,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

//local
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";
import { allUsers } from "../../../store/modules/usersSlices";
import { post } from "../../../services/axios/baseAPI";
import ModalAddDevice from "../../../components/modal/modalAddDevice";
import { getlistDeviceType } from "../../../store/modules/deviceRegisterSlices";

// scss
import styles from "./addDevice.module.scss";
import { optionRoom } from "../../../utils";

const { TextArea } = Input;

const AddDevice = () => {
  //translation
  const { t } = useTranslation("common");

  //redux
  const dispatch = useDispatch();
  const { listAllUser } = useSelector((state) => state.userInfo);
  const { listDeviceType } = useSelector((state) => state.deviceRegister);

  const [form] = Form.useForm();
  const [isModalAdd, setIsModalAdd] = useState(false);

  useEffect(() => {
    dispatch(allUsers());
    dispatch(getlistDeviceType());
  }, []);

  const onFinish = (value) => createDevice(value);

  const postCreate = (data) => post(`addDevice`, data);

  const { mutate: createDevice, isLoading: isCreatingDevice } = useMutation(
    postCreate,
    {
      onSuccess: (data) => {
        form.resetFields();
        notification.success({ message: t("add_devices.notifi_success") });
      },
      onError: (error) => {
        notification.error({ message: t("add_devices.notifi_err") });
        console.log(error);
      },
    }
  );

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Spin spinning={isCreatingDevice} tip={t("ults.spin_loading")}>
        <h1 className={styles.titlePage}>{t("add_devices.title_header")}</h1>
        <Divider />
        <Row className="rowContent">
          <Button
            type="primary"
            className="colorBtn"
            onClick={() => setIsModalAdd(true)}
          >
            {t("add_devices.btn_device_modal")}
          </Button>
        </Row>
        <Form
          className="form"
          name="form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row className={styles.formRow}>
            <Col xs={24} xl={10} xxl={10}>
              <Form.Item
                name="deviceName"
                label={t("add_devices.device_name")}
                rules={[
                  {
                    required: true,
                    message: t("add_devices.error_required_device_name"),
                  },
                ]}
              >
                <Input placeholder={t("add_devices.placeholder_device_name")} />
              </Form.Item>
            </Col>
            <Col xs={24} xl={10} xxl={10}>
              <Form.Item
                name="deviceLocation"
                label={t("add_devices.device_location")}
                rules={[
                  {
                    required: true,
                    message: t("add_devices.error_required_device_location"),
                  },
                ]}
              >
                <Cascader
                  options={optionRoom}
                  placeholder={t("add_devices.placeholder_device_location")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.formRow}>
            <Col xs={24} xl={10} xxl={10}>
              <Form.Item
                name="deviceType"
                label={t("add_devices.device_type")}
                rules={[
                  {
                    required: true,
                    message: t("add_devices.error_required_device_type"),
                  },
                ]}
              >
                <Select
                  showSearch
                  className="fullWidth"
                  placeholder={t("add_devices.placeholder_device_name")}
                  filterOption={(input, option) =>
                    (option?.label.toLowerCase() ?? "").includes(
                      input.toLowerCase()
                    )
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={listDeviceType.map((item) => {
                    return {
                      value: item.signatureDevice,
                      label: item.nameDevice,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={10}>
              <Form.Item
                name="manager"
                label={t("add_devices.manager")}
                rules={[
                  {
                    required: true,
                    message: t("add_devices.error_required_manager"),
                  },
                ]}
              >
                <Select
                  showSearch
                  className="fullWidth"
                  placeholder={t("add_devices.placeholder_device_name")}
                  filterOption={(input, option) =>
                    (option?.label.toLowerCase() ?? "").includes(
                      input.toLowerCase()
                    )
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={listAllUser.map((item) => {
                    return {
                      value: item._id,
                      label: `${item.firstName} ${item.lastName}-${item.studentCode}`,
                    };
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.formRow}>
            <Col xs={24} xl={10}>
              <Form.Item
                name="purpose"
                label={t("add_devices.purpose")}
                rules={[
                  {
                    required: true,
                    message: t("add_devices.error_required_purpose"),
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder={t("add_devices.placeholder_purpose")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={10}>
              <Form.Item name="note" label={t("add_devices.note")}>
                <TextArea
                  rows={4}
                  placeholder={t("add_devices.placeholder_note")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" className="fullWidth">
            <Col>
              <Space>
                <ButtonPrimary
                  nameBtn={t("add_devices.btn_submit")}
                  htmlType="submit"
                />
                <ButtonCancel
                  nameBtn={t("add_devices.btn_reset")}
                  onClickBtn={handleReset}
                />
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
      <ModalAddDevice isModal={isModalAdd} setIsModal={setIsModalAdd} />
    </>
  );
};

export default AddDevice;
