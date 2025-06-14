const jwt = require("jsonwebtoken");

const Educator = require("../models/Educator");

const requireEducatorAuth = async (req, res, next) => {
    const token = req.cookies?.token;
    try {
        if(!token) {
            return res.status(400).json({error: "Unauthorized Access"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;

        const educator = await Educator.findById(id);
        if(!educator) {
            return res.status(404).json({error: "User not found !!"});
        }

        req.educator = educator;
        next();
    } catch (err) {
        res.status(500).json({error: "Error: " + err.message});
    }
};

module.exports = requireEducatorAuth;