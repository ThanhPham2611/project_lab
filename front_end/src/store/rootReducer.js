import { combineReducers } from "@reduxjs/toolkit";

import usersSlices from "./modules/usersSlices";
import deviceRegisterSlices from "./modules/deviceRegisterSlices";
import requestAccountSlices from "./modules/requestAccount";

export default combineReducers({
  userInfo: usersSlices,
  deviceRegister: deviceRegisterSlices,
  requestAccount: requestAccountSlices,
});
