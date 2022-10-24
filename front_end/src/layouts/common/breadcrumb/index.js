import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

const BreadCrumb = (props) => {
  // props
  const { userRole } = props;

  // router-location
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((item) => item);

  return (
    <Breadcrumb className="breadcumb">
      <Breadcrumb.Item>{userRole === 1 ? "Admin" : "User"}</Breadcrumb.Item>
      {pathnames.map((name, index) => {
        const isLast = index === pathnames.length - 1;
        if (name.includes("-")) {
          const newName = name.split("-").join(" ");
          return isLast ? (
            <Breadcrumb.Item>{`${newName[0].toUpperCase()}${newName.slice(1)}`}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item href={`/${name}`}>{`${newName[0].toUpperCase()}${newName.slice(1)}`}</Breadcrumb.Item>
          );
        } else {
          return isLast ? (
            <Breadcrumb.Item>{`${name[0].toUpperCase()}${name.slice(1)}`}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item href={`/${name}`}>{`${name[0].toUpperCase()}${name.slice(1)}`}</Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
};

export default BreadCrumb;
