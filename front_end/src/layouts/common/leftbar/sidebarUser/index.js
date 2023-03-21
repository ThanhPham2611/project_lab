import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

//icon
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ToolOutlined,
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

  const subPathname = pathname.substring(pathname.lastIndexOf("-") + 1);

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
    getItem(t("sidebar.devices"), "devices", <ToolOutlined />, [
      getItem(
        <NavLink to="/register-devices">
          {t("sidebar.devices_register")}
        </NavLink>,
        "/register-devices"
      ),
      getItem(
        <NavLink to="/list-register-devices">
          {t("sidebar.devices_list")}
        </NavLink>,
        "/list-register-devices"
      ),
    ]),
    getItem(
      <NavLink to="/bug">{t("sidebar.bug")}</NavLink>,
      "/bug",
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
