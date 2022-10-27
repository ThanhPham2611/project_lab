import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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

export const appRouter = [
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
  const whiteList = ["/login", "/register", "/forget-password"];
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
  const whiteList = ["/login", "/register", "/forget-password"];
  const path = window.location.pathname;
  const isWhiteList = whiteList.includes(path);
  return (
    <div className={`main-content ${isWhiteList && "whitelist"}`}>
      <Switch>
        {renderRouter(appRouter).map((render) => render)}
        <PrivateRoute path="/test/:id" />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default routes;
