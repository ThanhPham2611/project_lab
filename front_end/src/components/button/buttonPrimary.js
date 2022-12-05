import React from "react";
import { Button } from "antd";

const ButtonPrimary = ({
  classNameBtn,
  nameBtn,
  htmlType,
  onClickBtn,
  styleBtn,
}) => {
  return (
    <Button
      className={`btn primary ${classNameBtn} `}
      htmlType={htmlType}
      onClick={onClickBtn}
      style={styleBtn}
    >
      {nameBtn}
    </Button>
  );
};

export default ButtonPrimary;
