import express from "express";
import * as UserController from "../controllers/user";
import { verifyToken } from "../config/middleware/tokenMiddle";

const router = express.Router();

//get
router.get("/myInfo", verifyToken, UserController.getMyInfo);

//post
router.post("/login", UserController.loginAuthen);
router.post("/register", UserController.registerAuthen);

//patch
router.patch("/updatePassword", UserController.updatePassword);
router.patch("/updateInfo", UserController.updateInfo);

export default router;
