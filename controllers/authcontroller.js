
import bcrypt from 'bcrypt'
import User from '../models/usermodel.js';
import { generateOtp } from '../utils/generator.js';
import { sendMail } from '../services/sendMail.js';
import Otp from '../models/otp.js';

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        // Hash password
        const hashed = bcrypt.hashSync(password, 10);


        // await User.save();
        const newUser = await User.create({
            name,
            email,
            password: hashed,
            phone,
            role: "USER"
        })


        // sending OTP to email for verification

        const emailExist = await Otp.findOne({ email })
        const otp = await generateOtp()
        if (emailExist) {
            await Otp.findOneAndUpdate({ email }, {
                otp: otp,
                isUsed: false,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            })
        } else {
            await Otp.create({
                email: email,
                otp: otp,
                isUsed: false,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            })
        }


        await sendMail(otp, email)
        return res.status(200).json({
            message: "Verification mail.sent successfully",
            data
        })
        //  return res.status(201).json({
        //     msg: "Registration successful",
        //     userId: newUser._id
        // })




    } catch (error) {
        res.status(500).json({ message: "register error", error });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "Email not found"
            })
        };

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                msg: "Wrong password"
            })
        };

        // Create token
        const payload = {
            email: userExist[0].email,
            phone: userExist[0].phone,
            fullname: userExist[0].fulLname,
            role: userExist[0].role,
            isVerified: userExist[0].isVerified
        }
        const token = jwt.sign(payload, "secretpassword")

        res.cookie('authToken', token)
        return res.status(200).json({
            message: "Logged in successfully",
            data: payload, token
        })



        // const token = jwt.sign(
        //     { id: user._id, role: user.role },
        //     "SECRET123",
        //     { expiresIn: "7d" }
        // );

        // res.json({
        //     msg: "Login success",
        //     token,
        //     role: user.role
        // });

    } catch (error) {
        res.status(500).json({ error });
    }
};
