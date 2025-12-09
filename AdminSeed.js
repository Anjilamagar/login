import bcrypt from "bcrypt";
import User from "./models/usermodel.js";

const seedAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: process.env.ADMIN_ROLE });

        if (existingAdmin) {
            console.log("✔ Admin already exists");
            return;
        }

        // Create hashed password
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        // Create admin user
        await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: process.env.ADMIN_ROLE
        });

        console.log(" Admin user successfully seeded!");
    } catch (error) {
        console.log(" Admin seeding error:", error.message);
    }
};

export default seedAdmin;
