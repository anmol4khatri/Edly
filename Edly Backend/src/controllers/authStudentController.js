const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");

// Sign up
const registerStudent = async (req, res) => {
    const educatorId = req.educatorFromSubdomain._id;
    const { firstName, lastName, emailId, password, confirmPassword } = req.body;

    try {
        if (!validator.isEmail(emailId)) {
            return res.status(400).json({ error: "Invalid Email ID" });
        };
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Choose a strong password" });
        };
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        };

        const existingAccount = await Student.findOne({ emailId, educatorId });
        if (existingAccount) {
            return res.status(400).json({ error: "Account already exists" });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            educatorId,
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        });
        const savedData = await student.save();

        const token = jwt.sign({ id: savedData?._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token);

        res.status(201).json({ message: "Saved", student: savedData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

// Login
const loginStudent = async (req, res) => {
    const educatorId = req.educatorFromSubdomain;
    const { emailId, password } = req.body;

    try {

        if (!emailId || emailId.length === 0) {
            return res.status(400).json({ error: "Email is required" });
        }
        if (!validator.isEmail(emailId)) {
            return res.status(400).json({ error: "Invalid Email ID" });
        }
        if (!password || password.length === 0) {
            return res.status(400).json({ error: "Password is required" });
        }

        const student = await Student.findOne({ emailId, educatorId });
        if (!student) {
            return res.status(404).json({ error: "invalid credentials" });
            // no need to sepcify "account does not exists"
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        const token = jwt.sign({ id: student?._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token);

        res.status(200).json({
            message: "Login successful",
            student: student,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout
const logoutStudent = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    registerStudent,
    loginStudent,
    logoutStudent
}