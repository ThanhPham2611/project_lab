/* eslint-disable no-restricted-globals */
import { Image } from "antd";
import React from "react";

//icon
import coming_soon from "../../assets/images/img/coming_soon.jpg";
import coming_soon_mobile from "../../assets/images/img/coming_soon_mobile.jpg";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Image
        src={screen.width <= 1110 ? coming_soon_mobile : coming_soon}
        alt="Coming soon"
        preview={false}
        height={screen.width <= 1110 ? "89vh" : "70vh"}
      />
    </div>
  );
};

export default Home;
