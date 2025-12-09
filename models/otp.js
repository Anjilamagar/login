import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    otp: { type: String, required: true },

    email: { type: String, required: true },

    isUsed: { type: Boolean, required: true, default: false },
    expiresAt: { type: Date, required: true },

}, { timestamps: true });

const Otp = mongoose.model('Otp', otpSchema)

export default Otp