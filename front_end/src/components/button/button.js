import React from "react";
import { Button } from "antd";

import styles from "./btn.module.scss";

const ButtonLab = ({
  classNameBtn,
  nameBtn,
  htmlType,
  onClickBtn,
  styleBtn,
}) => {
  return (
    <Button
      className={`btn ${styles.btn} ${classNameBtn}`}
      htmlType={htmlType}
      onClick={onClickBtn}
      style={styleBtn}
    >
      {nameBtn}
    </Button>
  );
};

export default ButtonLab;
