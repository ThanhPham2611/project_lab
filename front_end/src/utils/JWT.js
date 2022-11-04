import jwt_decode from "jwt-decode";

//local
import { getCookie, STORAGEKEY } from "../services/cookies";

const FULL_PERMISSION = "*";

export const getInformation = () => {
  const accessToken = getCookie(STORAGEKEY.ACCESS_TOKEN);
  return !accessToken || jwt_decode(accessToken);
};

export const checkPermission = (permission) => {
  let checkRole;
  const infor = getInformation();
  if (infor.role === 0) {
    checkRole = "admin";
  }
  if (permission === FULL_PERMISSION) return true;
  return permission.indexOf(checkRole) >= 0;
};
