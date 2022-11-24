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
      title="You have successfully registered an account"
      subTitle={`Email: ${accountUser.email} Password: ${accountUser.password}, password needs to be changed when created`}
      extra={[
        <Button onClick={() => history.push("/register-users")}>
          Finished
        </Button>,
      ]}
    />
  );
};

export default RegisterSuccess;
