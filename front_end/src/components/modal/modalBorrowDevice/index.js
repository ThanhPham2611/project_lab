import React, { useEffect } from "react";
import {
  DatePicker,
  Form,
  Modal,
  notification,
  Row,
  Select,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//local
import { allUsers } from "../../../store/modules/usersSlices";
import ButtonPrimary from "../../button/buttonPrimary";
import ButtonCancel from "../../button/buttonCancel";
import { patch } from "../../../services/axios/baseAPI";
import { getlistDevice } from "../../../store/modules/deviceRegisterSlices";

const ModalBorrowDevice = ({ isModal, setIsModal, dataValue }) => {
  //redux
  const dispatch = useDispatch();
  const { listAllUser } = useSelector((state) => state.userInfo);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(allUsers());
  }, []);

  const onClose = () => {
    setIsModal(false);
    form.resetFields();
  };

  const onFinish = (value) =>
    patch(`editDevice/${dataValue._id}`, { ...value, status: 1 })
      .then(() => {
        notification.success({ message: "Cho mượn thành công" });
        setIsModal(false);
        dispatch(getlistDevice());
        form.resetFields();
      })
      .catch(() => {
        notification.error({ message: "Lỗi server" });
      });

  return (
    <Modal
      title="Mượn thiết bị"
      open={isModal}
      onCancel={onClose}
      footer={false}
    >
      <Form form={form} onFinish={onFinish} labelCol={{ span: 5 }}>
        <Form.Item
          name="userId"
          label="Người mượn"
          rules={[{ required: true, message: "Bạn cần chọn trường này" }]}
        >
          <Select
            showSearch
            placeholder="Nhập mã sinh viên hoặc tên"
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={listAllUser.map((item) => {
              return {
                value: item._id,
                label: `${item.firstName} ${item.lastName} - ${item.studentCode}`,
              };
            })}
          />
        </Form.Item>

        <Form.Item
          name="returnDate"
          label="Ngày trả"
          rules={[{ required: true, message: "Bạn cần chọn trường này" }]}
        >
          <DatePicker
            placeholder="Chọn ngày trả"
            style={{ width: "100%" }}
            disabledDate={(current) => {
              return moment().subtract(1, "days") > current;
            }}
          />
        </Form.Item>

        <Row justify="center">
          <Space>
            <ButtonPrimary nameBtn="Chấp nhận" htmlType="submit" />
            <ButtonCancel nameBtn="Hủy" onClickBtn={onClose} />
          </Space>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalBorrowDevice;
