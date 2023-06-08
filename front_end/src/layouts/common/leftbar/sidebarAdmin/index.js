import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

//icon
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  DeliveredProcedureOutlined,
  UserOutlined,
  UserAddOutlined,
  BarsOutlined,
  BugOutlined,
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

  //state
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
      getItem(
        <NavLink to="/request-users">{t("sidebar.request_account")}</NavLink>,
        "/request-users",
        <BarsOutlined />
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
        <NavLink to="/list-request-devices">
          {t("sidebar.devices_list_register")}
        </NavLink>,
        "/list-request-devices"
      ),
    ]),
    getItem(
      <NavLink to="/payment">Thanh toán</NavLink>,
      "/payment",
      <DesktopOutlined />
    ),
  ];

  return (
    <>
      <Menu
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[subPathname]}
        mode="inline"
        items={itemMenu}
      />
    </>
  );
};

export default MenuAdmin;
