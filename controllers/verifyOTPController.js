import Otp from "../models/otp.js";
import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1️⃣ Find OTP for the email
        const otpRecord = await Otp.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({ message: "OTP not found. Please request again." });
        }

        // 2️⃣ Check OTP correctness
        if (otpRecord.otp !== Number(otp)) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        // 3️⃣ Check if OTP expired
        if (otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ message: "OTP expired. Please request again." });
        }

        // 4️⃣ OTP is valid → delete it from DB
        await Otp.deleteOne({ _id: otpRecord._id });

        // 5️⃣ Optional: Create user if registration
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash("Default@123", 10); // or get password from user
            const newUser = await User.create({ email, password: hashedPassword });
        }

        // 6️⃣ Optional: Issue JWT token for login
        const token = jwt.sign({ email }, "SECRET123", { expiresIn: "7d" });

        res.status(200).json({
            message: "OTP verified successfully",
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
