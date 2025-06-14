const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const Educator = require("../models/Educator");

const registerEducator = async (req, res) => {
    const { emailId, password, confirmPassword } = req.body;

    try {
        // Email and Password validation
        if (!validator.isEmail(emailId)) {
            return res.status(400).json({ error: "Invalid Email ID" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Choose a strong password" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user already exists
        const existingAccount = await Educator.findOne({ emailId });
        if (existingAccount) {
            return res.status(400).json({ error: "Account already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new instance of "Educator" model
        const educator = new Educator({
            emailId,
            password: hashedPassword,
            isVerified: false,
            isProfileComplete: false,
        });

        //save data to db
        const savedData = await educator.save();

        //Generate JWT Token and sending it to the browser
        const token = jwt.sign({ id: savedData?._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token);

        res.status(201).json({ message: "Saved", educator: savedData });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerEducator };
