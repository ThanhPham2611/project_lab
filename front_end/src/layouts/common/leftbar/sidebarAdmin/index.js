import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
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

  const { pathname } = useLocation();

  const itemMenu = [
    getItem(
      <NavLink to="/dashboard">{t("sidebar.dashboard")}</NavLink>,
      "/dashboard",
      <PieChartOutlined />
    ),
    getItem(
      <NavLink to="/profile">{t("sidebar.my_profile")}</NavLink>,
      "/profile",
      <DesktopOutlined />
    ),
    getItem(
      <NavLink to="/user">{t("sidebar.user")}</NavLink>,
      "/user",
      <UserOutlined />
    ),
    getItem(t("sidebar.devices"), "sub1", <TeamOutlined />, [
      getItem(
        <NavLink to="/devices-management">
          {t("sidebar.devices_management")}
        </NavLink>,
        "/devices-management"
      ),
      getItem(
        <NavLink to="/add-devices">{t("sidebar.devices_add_new_one")}</NavLink>,
        "/add-devices"
      ),
      getItem(
        <NavLink to="/devices_inventory">
          {t("sidebar.devices_inventory")}
        </NavLink>,
        "/devices_inventory"
      ),
      getItem(
        <NavLink to="/devices-list">
          {t("sidebar.devices_list_register")}
        </NavLink>,
        "/devices-list"
      ),
    ]),
    getItem(
      <NavLink to="/file">{t("sidebar.file")}</NavLink>,
      "/file",
      <FileOutlined />
    ),
  ];

  return (
    <Menu defaultSelectedKeys={[pathname]} mode="inline" items={itemMenu} />
  );
};

export default MenuAdmin;
