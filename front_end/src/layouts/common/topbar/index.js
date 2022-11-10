/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { Row, Col, Dropdown, Avatar, Menu, Space, Tooltip } from "antd";
import { useSelector } from "react-redux";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

//local
import { removeCookie, STORAGEKEY } from "../../../services/cookies";

//icon
import {
  KeyOutlined,
  GlobalOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import iconVietNam from "../../../assets/images/icon/vietnam.png";
import iconEngland from "../../../assets/images/icon/united-kingdom.png";

//scss
import styles from "./topbar.module.scss";
import ModalLanguage from "../../../components/modal/modalLanguage";
import ModalChangePassword from "../../../components/modal/modalChangePass";
import HeaderPC from "./screen/headerPC";
import HeaderMobile from "./screen/headerMobile";

const Topbar = () => {
  //redux
  const { userData } = useSelector((state) => state.userInfo);

  // translation
  const { language } = { ...i18n };
  const { t } = useTranslation("common");

  //state
  const [modalLanguage, setModalLanguage] = useState(false);
  const [modalChangePass, setModalChangePass] = useState(false);

  const handleLogout = async () => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN);
    await localStorage.removeItem("role");
    await localStorage.removeItem(STORAGEKEY.CHANGE_PASSWORD);
    window.location.href = "/login";
  };

  const handleModalLg = () => {
    setModalLanguage(true);
  };

  const handleModalChangePass = () => {
    setModalChangePass(true);
  };

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
      {screen.width <= 1110 ? <HeaderMobile /> : <HeaderPC />}

      <ModalLanguage
        isModalVisible={modalLanguage}
        setIsModalVisible={setModalLanguage}
      />
      <ModalChangePassword
        isModalVisible={modalChangePass}
        setIsModalVisible={setModalChangePass}
      />
    </>
  );
};

export default Topbar;
