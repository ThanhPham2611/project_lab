import React from "react";
import { Button } from "antd";

const ButtonCancel = ({ classNameBtn, nameBtn, onClickBtn, styleBtn }) => {
  return (
    <Button
      className={`btn cancel ${classNameBtn}`}
      onClick={onClickBtn}
      style={styleBtn}
    >
      {nameBtn}
    </Button>
  );
};

export default ButtonCancel;
