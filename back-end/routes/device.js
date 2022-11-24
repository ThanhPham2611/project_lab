import express from "express";

import { deviceRegister } from "../controllers/user/device_register";
import { getDeviceRegister } from "../controllers/user/get_device_register";

const router = express.Router();

//Get
router.get("/myListDevice", getDeviceRegister);

//Post
router.post("/deviceRegister", deviceRegister);

export default router;
