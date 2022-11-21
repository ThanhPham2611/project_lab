import React, { useState } from "react";
import { Avatar, Descriptions, Image, Row, Spin } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

//local
import ButtonPrimary from "../../components/button/buttonPrimary";
import ModalEditProfile from "../../components/modal/modalEditProfile";

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
      <Spin tip="Loading....." spinning={loading}>
        <Row justify="center">
          <Row
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: 300,
            }}
          >
            <Avatar
              size={200}
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
                TC31
              </Descriptions.Item>
              <Descriptions.Item label={t("my_profile.role")}>
                {role}
              </Descriptions.Item>
              <Descriptions.Item label={t("my_profile.office")}>
                {office}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title={t("my_profile.info_social")}
              className={styles.description}
            >
              <Descriptions.Item label={t("my_profile.facebook")}>
                {userData.facebook || "Empty"}
              </Descriptions.Item>
              <Descriptions.Item label={t("my_profile.tiktok")}>
                {userData.tiktok || "Empty"}
              </Descriptions.Item>
              <Descriptions.Item label={t("my_profile.instagram")}>
                {userData.instagram || "Empty"}
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
