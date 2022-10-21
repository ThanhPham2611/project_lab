import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb } from "antd";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { useTranslation } from "react-i18next";

//local
import { STORAGEKEY } from "../services/cookies";
import { userInfo } from "../store/modules/usersSlices";
import Topbar from "./common/topbar";
import MenuAdmin from "./common/leftbar/sidebarAdmin";

//icon
import iconLogo from "../assets/images/img/logoTLU.png";
import iconLogoVerital from "../assets/images/img/logoVertical.png";

//scss

const { Sider, Header, Content } = Layout;

const App = (props) => {
  //translation
  // const { t } = useTranslation("common");

  //components render
  const { renderRouter } = props;

  //redux
  const dispatch = useDispatch();

  //state
  const [collapsed, setCollapsed] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);

  //cookies
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN]);

  //redirect
  const history = useHistory();

  useEffect(() => {
    const isChangePW = localStorage.getItem("isChangePW");
    if (cookies[STORAGEKEY.ACCESS_TOKEN]) {
      if (isChangePW === "true") {
        setDisplayMenu(true);
        dispatch(userInfo());
        history.push("/dashboard");
      } else {
        history.push("/new-password");
      }
    } else {
      history.push("/login");
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
          <MenuAdmin />
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
