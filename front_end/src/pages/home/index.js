/* eslint-disable no-restricted-globals */
import { Image, Progress, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import HomeAdmin from "./homeAdmin";
import HomeUser from "./homeUser";

//icon
import coming_soon from "../../assets/images/img/coming_soon.jpg";
import coming_soon_mobile from "../../assets/images/img/coming_soon_mobile.jpg";

const Home = () => {
  // const [percent, setPercent] = useState(0);

  // useEffect(() => {
  //   const timer = setTimeout(randomPercent, 500);

  //   return () => clearTimeout(timer);
  // }, [percent]);

  // const randomPercent = () => {
  //   const randomNumber = Math.floor(Math.random() * 20) + 1;
  //   setPercent((prevPercent) => {
  //     const newPercent = prevPercent + randomNumber;
  //     if (newPercent > 100) {
  //       return 100;
  //     }
  //     return newPercent;
  //   });
  // };

  const userInfo = useSelector((state) => state.userInfo.userData);

  return (
    <>
      {userInfo.role === 1 ? <HomeUser /> : <HomeAdmin />}
      {/* <Image
        src={screen.width <= 1110 ? coming_soon_mobile : coming_soon}
        alt="Coming soon"
        preview={false}
        height={screen.width <= 1110 ? "89vh" : "70vh"}
      /> */}
      {/* <Progress
        type="circle"
        percent={percent}
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
      /> */}
    </>
  );
};

export default Home;
