import { Button, Result } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const RegisterSuccess = () => {
  //redux
  const { accountUser } = useSelector((state) => state.userInfo);

  console.log(accountUser);

  const history = useHistory();
  return (
    <Result
      status="success"
      title="Bạn tạo thành công tài khoản người dùng"
      subTitle={`Email: ${accountUser.email} Mật khẩu: ${accountUser.password}`}
      extra={[
        <Button onClick={() => history.push("/register-users")}>Trở về</Button>,
      ]}
    />
  );
};

export default RegisterSuccess;
