import express from "express";

//authen
import { loginAuthen } from "../controllers/auth/login";

//user
import { updatePassword } from "../controllers/user/update_password";
import { getMyInfo } from "../controllers/user/get_info";
import { updateInfo } from "../controllers/user/update_info";

//verifyToken
import { verifyToken } from "../config/middleware/tokenMiddle";

const router = express.Router();

//get
router.get("/myInfo", verifyToken, getMyInfo);

//post
router.post("/login", loginAuthen);

//patch
router.patch("/updatePassword", updatePassword);
router.patch("/updateInfo", updateInfo);

export default router;
