const jwt = require("jsonwebtoken");

const Student = require("../models/Student");

const requireStudentAuth = (req, res, next) => {
    const token = req?.cookies?.token;

    try {
        if(!token) {
            return res.status(401).json({error: "Unauthorized Access"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;

        const student = Student.findById(id);
        if(!student) {
            return res.status(404).json({error: "User not found !!"});
        }

        req.student = student;
        next();

    } catch (err) {
        res.status(500).json({error: "Error: " + err.message});
    }
};

module.exports = requireStudentAuth;