import { Result } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exits"
      extra={<NavLink to="/dashboard">Back home</NavLink>}
    />
  );
};

export default PageNotFound;
