/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { Avatar, Descriptions, Image, Row, Spin } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";

//local
import ButtonPrimary from "../../components/button/buttonPrimary";
import ModalEditProfile from "../../components/modal/modalEditProfile";
import { formatDate } from "../../utils";

//icon
import { UserOutlined } from "@ant-design/icons";

//scss
import styles from "./profile.module.scss";
import { EOffice, ERole } from "../../utils/role";

const Profile = () => {
  //redux
  const { userData, loading } = useSelector((state) => state.userInfo);

  //translation
  const { t } = useTranslation("common");

  //state
  const [modalEditProfile, setEditProfile] = useState(false);
  const [role] = useState(
    userData.role === ERole.user ? t("ults.student") : t("ults.admin")
  );
  const [office] = useState(
    userData.office === EOffice.student
      ? t("ults.student")
      : userData.office === EOffice.teacher
      ? t("ults.teacher")
      : t("ults.admin")
  );

  return (
    <>
      <Spin tip={t("ults.spin_loading")} spinning={loading}>
        <Row justify="center">
          <Row
            justify="space-between"
            align="middle"
            className={styles.rowAvatar}
          >
            <Avatar
              size={screen.width <= 1110 ? 150 : 200}
              src={userData.avatarUrl && <Image src={userData.avatarUrl} />}
              icon={!userData.avatarUrl && <UserOutlined />}
              className={styles.avatar}
            />
            <h1 className={styles.textName}>
              {userData.firstName + userData.lastName}
            </h1>
          </Row>
          <Row>
            <Descriptions
              title={t("my_profile.user_info")}
              extra={
                <ButtonPrimary
                  classNameBtn={`primary`}
                  nameBtn={t("my_profile.btn_edit_profile")}
                  onClickBtn={() => setEditProfile(true)}
                />
              }
              className={styles.description}
            >
              <Descriptions.Item label={t("my_profile.email")}>
                {userData.email}
              </Descriptions.Item>
              <Descriptions.Item label={t("my_profile.student_code")}>
                {userData.studentCode}
              </Descriptions.Item>
              <Descriptions.Item label={t("my_profile.phone")}>
                0{userData.phone}
              </Descriptions.Item>
              <Descriptions.Item label={t("my_profile.class")}>
                {userData.majors}
              </Descriptions.Item>
              <Descriptions.Item label={t("my_profile.role")}>
                {role}
              </Descriptions.Item>
              <Descriptions.Item label={t("my_profile.office")}>
                {office}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {moment(userData.birthday).format(formatDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo tài khoản">
                {moment(userData.createdAt).format(formatDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày cập nhật">
                {moment(userData.updatedAt).format(formatDate)}
              </Descriptions.Item>
            </Descriptions>
          </Row>
        </Row>
      </Spin>
      <ModalEditProfile
        isModalVisible={modalEditProfile}
        setIsModalVisible={setEditProfile}
        linkAvatar={userData.avatarUrl}
      />
    </>
  );
};

export default Profile;
