import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

//icon
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  DeliveredProcedureOutlined,
  UserOutlined,
  UserAddOutlined,
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
    getItem(t("sidebar.user"), "users", <UserOutlined />, [
      getItem(
        <NavLink to="/register-users">{t("sidebar.user_register")}</NavLink>,
        "/register-users",
        <UserAddOutlined />
      ),
      getItem(
        <NavLink to="/list-users">{t("sidebar.user_list")}</NavLink>,
        "/list-users",
        <TeamOutlined />
      ),
    ]),
    getItem(t("sidebar.devices"), "devices", <DeliveredProcedureOutlined />, [
      getItem(
        <NavLink to="/management-devices">
          {t("sidebar.devices_management")}
        </NavLink>,
        "/management-devices"
      ),
      getItem(
        <NavLink to="/add-devices">{t("sidebar.devices_add_new_one")}</NavLink>,
        "/add-devices"
      ),
      getItem(
        <NavLink to="/inventory-devices">
          {t("sidebar.devices_inventory")}
        </NavLink>,
        "/inventory-devices"
      ),
      getItem(
        <NavLink to="/list-request-devices">
          {t("sidebar.devices_list_register")}
        </NavLink>,
        "/list-request-devices"
      ),
    ]),
    getItem(
      <NavLink to="/file">{t("sidebar.file")}</NavLink>,
      "/file",
      <FileOutlined />
    ),
  ];

  return (
    <>
      <Menu
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[subPathname]}
        mode="inline"
        items={itemMenu}
      />
    </>
  );
};

export default MenuAdmin;
