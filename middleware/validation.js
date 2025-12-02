
export const Validators = {

    register(req, res, next) {
        const { name, email, password, phone } = req.body;

        // 1) Empty field check
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2) Name validation (only letters & spaces)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name.trim())) {
            return res.status(400).json({ message: "Name must contain only letters" });
        }

        // 3) Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // 4) Password validation (min 6 chars)
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        // 5) Phone validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Phone number must be 10 digits" });
        }

        next();
    }
};
