import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18next";
import { io } from "socket.io-client";

//local
import { STORAGEKEY } from "../services/cookies";
import { userInfo } from "../store/modules/usersSlices";
import Topbar from "./common/topbar";
import MenuAdmin from "./common/leftbar/sidebarAdmin";
import BreadCrumb from "./common/breadcrumb";

//icon
import iconLogo from "../assets/images/img/logoTLU.png";
import iconLogoVerital from "../assets/images/img/logoVertical.png";

//scss

const { Sider, Header, Content } = Layout;

// socket
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
});

const App = (props) => {
  //components render
  const { renderRouter } = props;

  //redux
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userInfo);

  //state
  const [collapsed, setCollapsed] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);

  //cookies
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN]);

  useEffect(() => {
    socket.emit("connected");
    i18n.changeLanguage(localStorage.getItem("language"));
    const isChangePW = localStorage.getItem("isChangePW");
    if (cookies[STORAGEKEY.ACCESS_TOKEN]) {
      if (isChangePW === "true") {
        setDisplayMenu(true);
        dispatch(userInfo());
      }
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
          {displayMenu && <BreadCrumb userRole={userData.role} />}

          <div className={displayMenu && "contentchildren"}>
            {renderRouter()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
