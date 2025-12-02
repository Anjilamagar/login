
import bcrypt from 'bcrypt'
import User from '../models/usermodel.js';

// REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        const exist = await User.find({ email: email });
        if (exist[0]) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        // Hash password
        const hashed = bcrypt.hashSync(password, 10);

        const data = await user.create({
            name,
            email,
            password: hashed,
            phone,
            role: "USER"
        })


        await User.save();
        res.json({ msg: "Registration successful" });

    } catch (error) {
        res.status(500).json("register error", error);
    }
};

// LOGIN
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ msg: "Email not found" });

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) return res.status(400).json({ msg: "Wrong password" });

//         // Create token
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             "SECRET123",
//             { expiresIn: "7d" }
//         );

//         res.json({
//             msg: "Login success",
//             token,
//             role: user.role
//         });

//     } catch (error) {
//         res.status(500).json({ error });
//     }
// };
