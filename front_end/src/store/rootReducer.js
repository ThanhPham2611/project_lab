import { combineReducers } from "@reduxjs/toolkit";

import usersSlices from "./modules/usersSlices";
import deviceRegisterSlices from "./modules/deviceRegisterSlices";

export default combineReducers({
  userInfo: usersSlices,
  deviceRegister: deviceRegisterSlices,
});
