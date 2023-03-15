/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Layout, notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18next";
import { useLocation } from "react-router-dom";
import isOnline from "is-online";
import { WifiOutlined } from "@ant-design/icons";

//local
import { getCookie, STORAGEKEY } from "../services/cookies";
import { userInfo } from "../store/modules/usersSlices";
import Topbar from "./common/topbar";
import MenuAdmin from "./common/leftbar/sidebarAdmin";
import BreadCrumb from "./common/breadcrumb";
import MenuUser from "./common/leftbar/sidebarUser";

//icon
import iconLogo from "../assets/images/img/logoTLU.png";
import iconLogoVerital from "../assets/images/img/logoVertical.png";
import { useTranslation } from "react-i18next";

//scss

const { Sider, Header, Content } = Layout;

const App = (props) => {
  //components render
  const { renderRouter } = props;

  const { pathname } = useLocation();

  //translation
  const { t } = useTranslation("common");

  //redux
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.userInfo);

  //state
  const [collapsed, setCollapsed] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  //cookies
  const cookies = getCookie(STORAGEKEY.ACCESS_TOKEN);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
    const isChangePassword = localStorage.getItem(STORAGEKEY.CHANGE_PASSWORD);
    if (cookies) {
      if (isChangePassword === "true") {
        setDisplayMenu(true);
        dispatch(userInfo());
      } else {
        localStorage.removeItem(STORAGEKEY.CHANGE_PASSWORD);
        setDisplayMenu(false);
      }
    } else {
      localStorage.removeItem(STORAGEKEY.CHANGE_PASSWORD);
      setDisplayMenu(false);
    }
  }, [cookies, pathname]);

  useEffect(() => {
    (async () => {
      if ((await isOnline()) === false) {
        api.open({
          message: "Mất kết nối mạng",
          icon: <WifiOutlined style={{ color: "#ff0000" }} />,
        });
      }
    })();
  }, [pathname]);

  return screen.width <= 1110 ? (
    <Spin spinning={loading} tip={t("ults.spin_loading")}>
      {contextHolder}
      <Layout className="site_layout">
        {displayMenu && (
          <Header className="header">
            <Topbar />
          </Header>
        )}
        <Content>
          <div style={{ padding: displayMenu ? 15 : 0 }}>{renderRouter()}</div>
        </Content>
      </Layout>
    </Spin>
  ) : (
    <Spin spinning={loading} tip={t("ults.spin_loading")}>
      {contextHolder}
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
            {userData.role === 0 ? <MenuAdmin /> : <MenuUser />}
          </Sider>
        )}

        <Layout className="site_layout">
          {displayMenu && (
            <Header className="header">
              <Topbar />
            </Header>
          )}

          <Content className={displayMenu ? "content" : ""}>
            {displayMenu && <BreadCrumb userRole={userData.role} />}

            <div className={displayMenu ? "contentchildren" : ""}>
              {renderRouter()}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default App;
