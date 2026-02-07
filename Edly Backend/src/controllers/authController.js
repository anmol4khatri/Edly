const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Sign up
const register = async (req, res) => {
    const tenantId = req.tenant._id;
    const { firstName, lastName, email, password, confirmPassword, role } = req.body; // Added role support (optional)

    try {
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid Email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Choose a strong password" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingAccount = await User.findOne({ email, tenantId });
        if (existingAccount) {
            return res.status(400).json({ error: "Account already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            tenantId,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || 'student' // Default to student if not specified
        });
        const savedUser = await newUser.save();

        const token = jwt.sign(
            { id: savedUser._id, tenantId: savedUser.tenantId, role: savedUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Strict cookie settings
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // Enable in production with HTTPS
            sameSite: 'strict'
        });

        // Hide password in response
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json({ message: "Registered successfully", user: userResponse });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Login
const login = async (req, res) => {
    const tenantId = req.tenant._id;
    const { email, password } = req.body;

    try {
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid Email" });
        }
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        // Find user specifically in THIS tenant
        const user = await User.findOne({ email, tenantId });
        if (!user) {
            return res.status(404).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, tenantId: user.tenantId, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // Enable in production with HTTPS
            sameSite: 'strict'
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: "Login successful",
            user: userResponse,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Logout
const logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register,
    login,
    logout
};
