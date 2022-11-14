import express from "express";
import * as UserController from "../controllers/user";
import { verifyToken } from "../config/middleware/tokenMiddle";

const router = express.Router();

//get
router.get("/myInfo", verifyToken, UserController.getMyInfo);
router.get("/allUser", verifyToken, UserController.getAllUser);

//post
router.post("/login", UserController.loginAuthen);
router.post("/register", UserController.registerAuthen);
router.post("/resetPassword", UserController.resetPassword);
router.post("/sendCode", UserController.sendCodeVerify);
router.post("/adminReset", UserController.AdminResetPassword);

//patch
router.patch("/updatePassword", UserController.updatePassword);
router.patch("/updateInfo", UserController.updateInfo);

export default router;
