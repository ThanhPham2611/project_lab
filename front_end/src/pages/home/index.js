/* eslint-disable no-restricted-globals */
import React from "react";
import { useSelector } from "react-redux";

import HomeAdmin from "./homeAdmin";
import HomeUser from "./homeUser";

const Home = () => {
  const userInfo = useSelector((state) => state.userInfo.userData);

  return (
    <>
      {userInfo.role === 1 ? (
        <HomeUser />
      ) : userInfo.role === 0 ? (
        <HomeAdmin />
      ) : (
        <p>Something was wrong...</p>
      )}
    </>
  );
};

export default Home;
