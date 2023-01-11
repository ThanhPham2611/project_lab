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
import { useHistory } from "react-router-dom";

//local
import { allUsers } from "../../../store/modules/usersSlices";
import ButtonPrimary from "../../button/buttonPrimary";
import ButtonCancel from "../../button/buttonCancel";
import { patch } from "../../../services/axios/baseAPI";

const ModalBorrowDevice = ({ isModal, setIsModal, dataValue }) => {
  //redux
  const dispatch = useDispatch();
  const { listAllUser } = useSelector((state) => state.userInfo);

  const [form] = Form.useForm();
  const history = useHistory();

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
        history.push("management-devices");
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
          name="idUser"
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
          name="borrowDate"
          label="Ngày mượn"
          rules={[{ required: true, message: "Bạn cần chọn trường này" }]}
        >
          <DatePicker />
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