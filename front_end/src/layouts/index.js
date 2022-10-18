import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

//icon
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import iconLogo from "../assets/images/img/logoTLU.png";
import iconLogoVerital from "../assets/images/img/logoVertical.png";

//scss

const { Sider, Header, Content } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const itemMenu = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const App = () => {
  //state
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="siderMenu"
      >
        <div className="wrapperLogo">
          {collapsed ? (
            <img src={iconLogoVerital} alt="logo tlu" className="logo" />
          ) : (
            <img src={iconLogo} alt="logo tlu" className="logo" />
          )}
        </div>
        <Menu defaultSelectedKeys={["1"]} mode="inline" items={itemMenu} />
      </Sider>
      <Layout className="site_layout">
        <Header className="header"></Header>
        <Content className="content">
          <Breadcrumb className="breadcumb">
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="contentchildren">Dang test thuwr bases</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
