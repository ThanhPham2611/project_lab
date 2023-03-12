import express from "express";
import { delRegisterDevice } from "../controllers/user/delete_device_register";
//user
import { deviceRegister } from "../controllers/user/device_register";
import { getDeviceRegister } from "../controllers/user/get_device_register";
import { extendRegister } from "../controllers/user/patch_device_register";

const router = express.Router();

//Get
router.get("/myListDevice", getDeviceRegister);

//Post
router.post("/deviceRegister", deviceRegister);

//patch
router.patch("/patchRegister/:id", extendRegister);

//del
router.delete("/deleteRegister/:id", delRegisterDevice);

export default router;
