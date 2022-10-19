import { combineReducers } from "@reduxjs/toolkit";

import usersSlices from "./modules/usersSlices";

export default combineReducers({
  userInfo: usersSlices,
});
