import { Avatar, Col, Drawer, Dropdown, Menu, Row, Space, Tooltip } from "antd";
import React, { useState } from "react";
import i18n from "i18next";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

//local

//icon
import {
  GlobalOutlined,
  KeyOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import iconVietNam from "../../../../assets/images/icon/vietnam.png";
import iconEngland from "../../../../assets/images/icon/united-kingdom.png";

//scss
import styles from "../topbar.module.scss";
import { removeCookie, STORAGEKEY } from "../../../../services/cookies";
import ModalLanguage from "../../../../components/modal/modalLanguage";
import ModalChangePassword from "../../../../components/modal/modalChangePass";

const HeaderMobile = () => {
  //redux
  const { userData } = useSelector((state) => state.userInfo);

  // translation
  const { language } = { ...i18n };
  const { t } = useTranslation("common");

  //state
  const [modalLanguage, setModalLanguage] = useState(false);
  const [modalChangePass, setModalChangePass] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleModalLg = () => {
    setModalLanguage(true);
  };

  const handleModalChangePass = () => {
    setModalChangePass(true);
  };

  const handleLogout = async () => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN);
    await localStorage.removeItem("role");
    await localStorage.removeItem(STORAGEKEY.CHANGE_PASSWORD);
    window.location.href = "/login";
  };

  const closeSidebar = () => {};

  //menu dropdown
  const menuAvatar = (
    <Menu
      items={[
        {
          label: <span onClick={handleModalLg}>{t("topbar.language")}</span>,
          key: 0,
          icon: <GlobalOutlined />,
        },
        {
          label: (
            <span onClick={handleModalChangePass}>
              {t("topbar.change_password")}
            </span>
          ),
          key: 1,
          icon: <KeyOutlined />,
        },
        {
          label: <span onClick={handleLogout}>{t("topbar.logout")}</span>,
          key: 2,
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <>
      <Row align="middle" className={styles.headerMobile}>
        <Col sm={2} xs={2} style={{ display: "flex" }}>
          <MenuUnfoldOutlined
            style={{ fontSize: 25 }}
            onClick={() => setOpenSidebar(true)}
          />
        </Col>
        <Col sm={22} xs={22}>
          <Row justify="space-between">
            <Col>
              <span>
                {t("topbar.welcome")},{" "}
                <b>{userData.firstName + userData.lastName}</b>
              </span>
            </Col>
            <Col>
              <Space>
                <Tooltip placement="bottom" title={t("topbar.language")}>
                  <img
                    className={styles.flagIcon}
                    src={language === "vi" ? iconVietNam : iconEngland}
                    alt={language === "vi" ? "vietnam flag" : "england flag"}
                  />
                </Tooltip>
                <Dropdown
                  overlay={menuAvatar}
                  trigger={["click"]}
                  overlayClassName="avatar"
                >
                  <Avatar
                    src={userData.avatarUrl}
                    icon={!userData.avatarUrl && <UserOutlined />}
                  ></Avatar>
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalLanguage
        isModalVisible={modalLanguage}
        setIsModalVisible={setModalLanguage}
      />
      <ModalChangePassword
        isModalVisible={modalChangePass}
        setIsModalVisible={setModalChangePass}
      />
      <Drawer
        // title="Basic Drawer"
        placement="left"
        closable={true}
        onClose={() => setOpenSidebar(false)}
        open={openSidebar}
        key="left"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default HeaderMobile;
