/* eslint-disable no-restricted-globals */
import React from "react";

import HeaderPC from "./screen/headerPC";
import HeaderMobile from "./screen/headerMobile";

const Topbar = () => {
  return <>{screen.width <= 1110 ? <HeaderMobile /> : <HeaderPC />}</>;
};

export default Topbar;
