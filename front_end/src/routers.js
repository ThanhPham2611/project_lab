import React, { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

//local
import { STORAGEKEY } from "./services/cookies";
import { checkPermission } from "./utils/JWT";

//components
import Login from "./pages/login";
import Home from "./pages/home";
import PageNotFound from "./pages/404";
import NewPassword from "./pages/newpassword";
import Profile from "./pages/profile";
import ForgotPassword from "./pages/forget_password";
import Register from "./pages/admin/register";
import RegisterSuccess from "./pages/admin/register/registerSuccess";
import ListUsers from "./pages/admin/list_users";
import AddDevice from "./pages/admin/add_devices";
import DeviceManagement from "./pages/admin/device_management";
import DeviceRegister from "./pages/user/device_regsiter";
import ListDeviceRegister from "./pages/user/list_device_register";
import DevicesResList from "./pages/admin/devices_request_list";
import CheckDevice from "./pages/admin/check_device";
import RegisterUser from "./pages/register_user";
import RequestAccount from "./pages/admin/request_account";
import PaymentScreen from "./pages/payment";

export const BlankPage = () => {
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN]);
  const history = useHistory();
  useEffect(() => {
    if (cookies) {
      history.push("/dashboard");
    } else {
      history.push("/login");
    }
  }, []);
  return <div></div>;
};

export const appRouter = [
  {
    name: "Blank_page",
    path: "/",
    component: BlankPage,
    meta: {
      role: "*",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      role: "*",
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Forget-password",
    path: "/forget-password",
    component: ForgotPassword,
    meta: {
      role: "*",
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Register-user",
    path: "/register-user",
    component: RegisterUser,
    meta: {
      role: "*",
      isPrivate: false,
      hidden: false,
      child: false,
    },
  },
  {
    name: "new-password",
    path: "/new-password",
    component: NewPassword,
    meta: {
      role: "*",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Home",
    path: "/dashboard",
    component: Home,
    meta: {
      role: "*",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Profile",
    path: "/profile",
    component: Profile,
    meta: {
      role: "*",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Device register",
    path: "/register-devices",
    component: DeviceRegister,
    meta: {
      role: "*",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "List register",
    path: "/list-register-devices",
    component: ListDeviceRegister,
    meta: {
      role: "*",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Register",
    path: "/register-users",
    component: Register,
    meta: {
      role: "admin",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "Registersuccess",
    path: "/success-register",
    component: RegisterSuccess,
    meta: {
      role: "admin",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "List users",
    path: "/list-users",
    component: ListUsers,
    meta: {
      role: "admin",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "AddDevice",
    path: "/add-devices",
    component: AddDevice,
    meta: {
      role: "admin",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "DeviceManagement",
    path: "/management-devices",
    component: DeviceManagement,
    meta: {
      role: "admin",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "ListRequestDevice",
    path: "/list-request-devices",
    component: DevicesResList,
    meta: {
      role: "admin",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "checkDevice",
    path: "/inventory-devices",
    component: CheckDevice,
    meta: {
      role: "admin",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "requestAccount",
    path: "/request-users",
    component: RequestAccount,
    meta: {
      role: "admin",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
  {
    name: "payment",
    path: "/payment",
    component: PaymentScreen,
    meta: {
      role: "admin",
      isPrivate: true,
      hidden: false,
      child: false,
    },
  },
];

const PrivateRoute = (props) => {
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN]);
  const Component = props.component;
  return (
    <Route
      path={props.path}
      exact
      render={(prop) =>
        cookies[STORAGEKEY.ACCESS_TOKEN] ? (
          <Component {...prop} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { redirect_url: prop.location },
            }}
          />
        )
      }
    />
  );
};

const WhiteListRoute = (props) => {
  const whiteList = [
    "/login",
    "/register",
    "/forget-password",
    "/register-user",
  ];
  const [cookies] = useCookies([STORAGEKEY.ACCESS_TOKEN]);
  const isWhiteList = (path) =>
    !cookies[STORAGEKEY.ACCESS_TOKEN] && whiteList.indexOf(path) >= 0;

  return (
    <Route
      path={props.path}
      exact
      render={(prop) =>
        isWhiteList(props.path) ? (
          <div>{React.createElement(props.component, prop)}</div>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

const renderRouter = (routes) => {
  let arr = [];
  routes.forEach((route) => {
    const tmpRoute = route.meta.isPrivate ? (
      <PrivateRoute
        exact
        path={route.path}
        component={route.component}
        key={route.name}
      />
    ) : (
      <WhiteListRoute
        exact
        path={route.path}
        component={route.component}
        key={route.name}
      />
    );
    if (checkPermission(route.meta.role)) {
      arr.push(tmpRoute);
    }
    if (route.children) {
      arr = arr.concat(renderRouter(route.children));
    }
  });
  return arr;
};

const routes = () => {
  const whiteList = ["/login", "/forget-password", "/register-user"];
  const path = window.location.pathname;
  const isWhiteList = whiteList.includes(path);
  return (
    <div className={`main-content ${isWhiteList ? "whitelist" : ""}`}>
      <Switch>
        {renderRouter(appRouter).map((render) => render)}
        <PrivateRoute path="/test/:id" />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default routes;
