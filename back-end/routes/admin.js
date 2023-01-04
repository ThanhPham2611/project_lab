import express from "express";

//verify token
import { verifyToken } from "../config/middleware/tokenMiddle";

//get
import { getAllUser } from "../controllers/admin/get_all_user";
import { getInfoUser } from "../controllers/admin/get_info_user";
import { getRequestList } from "../controllers/admin/get_request_devices";
import { getDevice } from "../controllers/admin/get_device";
import { getDeviceSignature } from "../controllers/admin/get_device_signature";
import { getInfoDevice } from "../controllers/admin/get_info_device";

//post
import { registerAuthen } from "../controllers/admin/register";
import { AdminResetPassword } from "../controllers/admin/reset_pass_user";
import { resetPassword } from "../controllers/user/reset_password";
import { sendCodeVerify } from "../controllers/user/send_verify_code";
import { CreateDevices } from "../controllers/admin/post_devices";
import { createSigDevice } from "../controllers/admin/post_sig_device";

//patch
import { patchRequestList } from "../controllers/admin/patch_request_devices";
import { patchDevice } from "../controllers/admin/patch_device";

const router = express.Router();

router.get("/allUser", verifyToken, getAllUser);
router.get("/request_device", verifyToken, getRequestList);
router.get("/getDevice", getDevice);
router.get("/getDeviceSig", getDeviceSignature);
router.get("/getInfoDevice", getInfoDevice);

router.post("/register", registerAuthen);
router.post("/resetPassword", resetPassword);
router.post("/sendCode", sendCodeVerify);
router.post("/adminReset", AdminResetPassword);
router.post("/getInfoUser", getInfoUser);
router.post("/addDevice", CreateDevices);
router.post("/addDeviceSig", createSigDevice);

router.patch("/request_device/:id", patchRequestList);
router.patch("/editDevice/:id", patchDevice);

export default router;
