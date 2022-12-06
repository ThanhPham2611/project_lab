import express from "express";

//verify token
import { verifyToken } from "../config/middleware/tokenMiddle";

//get
import { getAllUser } from "../controllers/admin/get_all_user";
import { getInfoUser } from "../controllers/admin/get_info_user";
import { getRequestList } from "../controllers/admin/get_request_devices";

//post
import { registerAuthen } from "../controllers/admin/register";
import { AdminResetPassword } from "../controllers/admin/reset_pass_user";
import { resetPassword } from "../controllers/user/reset_password";
import { sendCodeVerify } from "../controllers/user/send_verify_code";

const router = express.Router();

router.get("/allUser", verifyToken, getAllUser);
router.get("/request_device", verifyToken, getRequestList);

router.post("/register", registerAuthen);
router.post("/resetPassword", resetPassword);
router.post("/sendCode", sendCodeVerify);
router.post("/adminReset", AdminResetPassword);
router.post("/getInfoUser", getInfoUser);

export default router;
