import express from "express";
import { Validators } from "../middleware/validation.js";
import { register } from "../controllers/authcontroller.js";
import { verifyOtp } from "../controllers/verifyOTPController.js";

const router = express.Router();

router.post("/register", Validators.register, register);
// router.post("/verify-otp", verifyOtp);


export default router;
