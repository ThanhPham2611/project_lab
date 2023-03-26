import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import style from './homeUser.module.scss'

const HomeUser = () => {
  const { push } = useHistory();
  const userInfo = useSelector((state) => state.userInfo.userData);

  return (
    <>
      <div>
        Chào mừng{" "}
        <span style={{ fontSize: "18px", fontWeight: "700" }}>
          {userInfo.firstName.toUpperCase()} {userInfo.lastName.toUpperCase()}
        </span>{" "}
        đã đến với phòng lab IOT của trường đại học Thăng Long{" "}
      </div>
      <div
        className={style.link}
        onClick={() => push("/register-devices")}
        style={{
          cursor: 'pointer',
          marginTop: "20px",
          border: "1px #000 solid",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        Đăng ký đơn tạo?
      </div>
      <div
        style={{
          border: "1px #000 solid",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <p>Thông tin cơ bản</p>
        <p>Phòng lab IOT Đại học Thăng Long</p>
        <p>
          Địa chỉ: Đại học Thăng Long, Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà
          Nội
        </p>
        <p>Quản lý: Thầy Nguyễn Ngọc Tân</p>
      </div>
    </>
  );
};

export default HomeUser;
