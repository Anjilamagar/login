import Otp from "../models/otp.js";
import { sendMail } from "../services/sendMail.js";//email sender function
import { generateOtp } from "../utils/generator.js";

export const sendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;

        const emailExist = await Otp.findOne({ email });
        const otp = generateOtp();
        const expireMinutes = process.env.OTP_EXPIRE_MINUTES || 5;

        const expiryTime = new Date(Date.now() + expireMinutes * 60 * 1000);


        if (emailExist) {
            await Otp.findOneAndUpdate({ email }, {
                otp: otp, isUsed: false, expiresAt: expiryTime
            });
        } else {
            await Otp.create({
                email, otp, isUsed: false, expiresAt: expiryTime
            });      // 5 minutes from now
        }

        await sendMail(otp, email);

        return res.status(200).json({
            message: "Verification mail sent successfully",
        })
        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while sending email." });
    }
};
