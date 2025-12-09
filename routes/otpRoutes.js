import express from "express";
import { sendOtp } from "../controllers/sendOtp.js";
import { verifyOtp } from "../controllers/verifyOTPController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
