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

const MenuUser = () => {
  // translation
  const { t } = useTranslation("common");

  const { pathname } = useLocation();

  const subPathname = pathname.substring(pathname.indexOf("-") + 1);

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
    getItem(t("sidebar.devices"), "sub2", <TeamOutlined />, [
      getItem(
        <NavLink to="/devices-register">
          {t("sidebar.devices_register")}
        </NavLink>,
        "/devices-register"
      ),
      getItem(
        <NavLink to="/devices-list">{t("sidebar.devices_list")}</NavLink>,
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
    <Menu
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={[subPathname]}
      mode="inline"
      items={itemMenu}
    />
  );
};

export default MenuUser;
