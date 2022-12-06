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
  //state
  const [modalLanguage, setModalLanguage] = useState(false);
  const [modalChangePass, setModalChangePass] = useState(false);

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
