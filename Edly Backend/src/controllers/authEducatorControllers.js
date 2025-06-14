const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const Educator = require("../models/Educator");

// Sign Up
const registerEducator = async (req, res) => {
    const { emailId, password, confirmPassword } = req.body;

    try {
        if (!validator.isEmail(emailId)) {
            return res.status(400).json({ error: "Invalid Email ID" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Choose a strong password" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingAccount = await Educator.findOne({ emailId });
        if (existingAccount) {
            return res.status(400).json({ error: "Account already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const educator = new Educator({
            emailId,
            password: hashedPassword,
            isVerified: false,
            isProfileComplete: false,
        });

        const savedData = await educator.save();

        const token = jwt.sign({ id: savedData?._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token);

        res.status(201).json({ message: "Saved", educator: savedData });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
const loginEducator = async (req, res) => {
    const { emailId, password } = req.body;

    try {
        if (!validator.isEmail(emailId)) {
            return res.status(400).json({ error: "Invalid Email ID" });
        }

        const educator = await Educator.findOne({emailId});
        if(!educator) {
            return res.status(404).json({error: "invalid credentials"});
            // no need to sepcify "account does not exists"
        }
        
        const isMatch = await bcrypt.compare(password, educator.password);
        if(!isMatch) {
            return res.status(400).json({error: "Invalid credentials"})
        }

        const token = jwt.sign({ id: educator?._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token);

        res.status(200).json({
            message: "Login successful",
            educator: educator,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout
const logoutEducator = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerEducator, loginEducator, logoutEducator };
