/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18next";
import { useLocation } from "react-router-dom";

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

//scss

const { Sider, Header, Content } = Layout;

const App = (props) => {
  //components render
  const { renderRouter } = props;

  const { pathname } = useLocation();

  //redux
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userInfo);

  //state
  const [collapsed, setCollapsed] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);

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

  return screen.width <= 1110 ? (
    <Layout className="site_layout">
      {displayMenu && (
        <Header className="header">
          <Topbar />
        </Header>
      )}
      <Content>
        <div>{renderRouter()}</div>
      </Content>
    </Layout>
  ) : (
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
  );
};

export default App;
