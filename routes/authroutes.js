import express from "express";
import { Validators } from "../middleware/validation.js";
import { register } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", Validators.register, register);

export default router;
