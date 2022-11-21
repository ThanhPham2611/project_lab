import { Avatar, Col, Image, Modal, Row, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

//locale
import { formatDate } from "../../../utils";

//icon
import { UserOutlined } from "@ant-design/icons";

//styles
import styles from "./modalViewUser.module.scss";
import { EOffice, ERole } from "../../../utils/role";

const ModalViewUser = ({ isModal, setIsModal }) => {
  //redux
  const { detailUser } = useSelector((state) => state.userInfo);

  console.log("modallll", detailUser);

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
      <Spin tip="Loading...." spinning={!detailUser}>
        <Row justify="center" className={styles.rowDetail}>
          <Avatar
            size={100}
            src={detailUser.avatarUrl && <Image src={detailUser.avatarUrl} />}
            icon={!detailUser.avatarUrl && <UserOutlined />}
            alt="Avatar user"
            height={100}
          />
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col span={12}>
            <label>Tên người dùng: </label>
            <span>{`${detailUser.firstName} ${detailUser.lastName}`}</span>
          </Col>
          <Col span={12}>
            <label>Ngày sinh: </label>
            <span>{moment(detailUser.birthday).format(formatDate)}</span>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col span={12}>
            <label>Email: </label>
            <span>{detailUser.email}</span>
          </Col>
          <Col span={12}>
            <label>Is change password: </label>
            <span>
              {detailUser.isChangePassword ? "Đã thay đổi" : "Chưa thay đổi"}
            </span>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col span={12}>
            <label>Ngành: </label>
            <span>{detailUser.majors || "Null"}</span>
          </Col>
          <Col span={12}>
            <label>Chức vụ: </label>
            <span>
              {detailUser.office === EOffice.admin
                ? "Admin"
                : detailUser.office === EOffice.student
                ? "Student"
                : "Teacher"}
            </span>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col span={12}>
            <label>Só điện thoại: </label>
            <span>{`0${detailUser.phone}`}</span>
          </Col>
          <Col span={12}>
            <label>Quyền </label>
            <span>{detailUser.role === ERole.admin ? "Admin" : "User"}</span>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.rowDetail}>
          <Col span={12}>
            <label>Ngày khởi tạo: </label>
            <span>{moment(detailUser.createdAt).format(formatDate)}</span>
          </Col>
          <Col span={12}>
            <label>Ngày cập nhật: </label>
            <span>{moment(detailUser.updatedAt).format(formatDate)}</span>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default ModalViewUser;
