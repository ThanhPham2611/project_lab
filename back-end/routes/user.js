import express from "express";

//authen
import { loginAuthen } from "../controllers/auth/login";

//user
import { updatePassword } from "../controllers/user/update_password";
import { getMyInfo } from "../controllers/user/get_info";
import { updateInfo } from "../controllers/user/update_info";
import { postUserRegister } from "../controllers/user/user_register";
import { getListDevice } from "../controllers/user/get_list_device";

//verifyToken
import { verifyToken } from "../config/middleware/tokenMiddle";

const router = express.Router();

//get
router.get("/myInfo", verifyToken, getMyInfo);
router.get("/getListDevice", verifyToken, getListDevice);

//post
router.post("/login", loginAuthen);
router.post("/registerUser", postUserRegister);

//patch
router.patch("/updatePassword", updatePassword);
router.patch("/updateInfo", updateInfo);

export default router;
