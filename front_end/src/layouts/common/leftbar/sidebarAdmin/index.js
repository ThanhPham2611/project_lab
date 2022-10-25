import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

//icon
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const MenuAdmin = () => {
  // translation
  const { t } = useTranslation("common");

  const itemMenu = [
    getItem(
      <NavLink to="/dashboard">{t("sidebar.dashboard")}</NavLink>,
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <NavLink to="/profile">{t("sidebar.my_profile")}</NavLink>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <NavLink to="/dashboard">{t("sidebar.user")}</NavLink>,
      "3",
      <UserOutlined />
    ),
    getItem(t("sidebar.devices"), "sub1", <TeamOutlined />, [
      getItem(
        <NavLink to="/devices-management">{t("sidebar.devices_management")}</NavLink>,
        "4"
      ),
      getItem(
        <NavLink to="/dashboard">{t("sidebar.devices_add_new_one")}</NavLink>,
        "5"
      ),
      getItem(
        <NavLink to="/dashboard">{t("sidebar.devices_inventory")}</NavLink>,
        "6"
      ),
      getItem(
        <NavLink to="/dashboard">{t("sidebar.devices_list_register")}</NavLink>,
        "7"
      ),
    ]),
    getItem(
      <NavLink to="/dashboard">{t("sidebar.file")}</NavLink>,
      "9",
      <FileOutlined />
    ),
  ];

  return (
    <Menu defaultSelectedKeys={["1"]} mode="inline" items={itemMenu} />
  )
}

export default MenuAdmin
