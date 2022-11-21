import { Image } from "antd";
import React from "react";

//icon
import coming_soon from "../../assets/images/img/coming_soon.jpg";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Image
        src={coming_soon}
        alt="Coming soon"
        preview={false}
        height="70vh"
      />
    </div>
  );
};

export default Home;
