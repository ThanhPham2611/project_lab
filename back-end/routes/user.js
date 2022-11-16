import express from "express";

//authen
import { loginAuthen } from "../controllers/auth/login";

//admin
import { registerAuthen } from "../controllers/admin/register";
import { getAllUser } from "../controllers/admin/get_all_user";
import { AdminResetPassword } from "../controllers/admin/reset_pass_user";
import { getInfoUser } from "../controllers/admin/get_info_user";

//user
import { updatePassword } from "../controllers/user/update_password";
import { getMyInfo } from "../controllers/user/get_info";
import { updateInfo } from "../controllers/user/update_info";
import { resetPassword } from "../controllers/user/reset_password";
import { sendCodeVerify } from "../controllers/user/send_verify_code";

//verifyToken
import { verifyToken } from "../config/middleware/tokenMiddle";

const router = express.Router();

//get
router.get("/myInfo", verifyToken, getMyInfo);
router.get("/allUser", verifyToken, getAllUser);

//post
router.post("/login", loginAuthen);
router.post("/register", registerAuthen);
router.post("/resetPassword", resetPassword);
router.post("/sendCode", sendCodeVerify);
router.post("/adminReset", AdminResetPassword);
router.post("/getInfoUser", getInfoUser);

//patch
router.patch("/updatePassword", updatePassword);
router.patch("/updateInfo", updateInfo);

export default router;
