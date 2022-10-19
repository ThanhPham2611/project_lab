import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
//local
import { STORAGEKEY } from "../services/cookies";
import { userInfo } from "../store/modules/usersSlices";
import Topbar from "./common/topbar";

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
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("My profile", "2", <DesktopOutlined />),
  getItem("User", "3", <UserOutlined />),
  getItem("Devices", "sub2", <TeamOutlined />, [
    getItem("Register", "6"),
    getItem("Rental list", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const App = (props) => {
  //components render
  const { renderRouter } = props;

  //redux
  const dispatch = useDispatch();

  //state
  const [collapsed, setCollapsed] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);

  //cookies
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN]);

  useEffect(() => {
    const isChangePW = localStorage.getItem("isChangePW");
    if (cookies[STORAGEKEY.ACCESS_TOKEN] && isChangePW === "true") {
      setDisplayMenu(true);
      dispatch(userInfo());
    } else {
      setDisplayMenu(false);
    }
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {displayMenu && (
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
      )}

      <Layout className="site_layout">
        {displayMenu && (
          <Header className="header">
            <Topbar />
          </Header>
        )}

        <Content className={displayMenu && "content"}>
          {displayMenu && (
            <Breadcrumb className="breadcumb">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
          )}

          <div className={displayMenu && "contentchildren"}>
            {renderRouter()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
