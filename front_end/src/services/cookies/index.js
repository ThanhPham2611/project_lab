import moment from "moment";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const STORAGEKEY = {
  ACCESS_TOKEN: "access_token_lab",
  CHANGE_PASSWORD: "is_change_password",
};

export const setCookie = (key, value) =>
  cookies.set(key, value, {
    expires: new Date(moment().add("1", "days").format("YYYY-MM-DD HH:mm")),
  });

export const getCookie = (key) => cookies.get(key);
export const removeCookie = (key) => cookies.remove(key);

export const getToken = async () => {
  const token = await getCookie(STORAGEKEY.ACCESS_TOKEN);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
