import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

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
      <div onClick={() => push("/register-devices")}>Go</div>
      <div onClick={() => push("/list-register-devices")}>Go</div>
    </>
  );
};

export default HomeUser;
