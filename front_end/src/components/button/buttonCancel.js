import React from "react";
import { Button } from "antd";

const ButtonCancel = ({
  classNameBtn,
  nameBtn,
  onClickBtn,
  styleBtn,
  disabled,
}) => {
  return (
    <Button
      className={`btn cancel ${classNameBtn}`}
      onClick={onClickBtn}
      style={styleBtn}
      disabled={disabled}
    >
      {nameBtn}
    </Button>
  );
};

export default ButtonCancel;
