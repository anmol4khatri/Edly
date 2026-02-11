import jwt from "jsonwebtoken";
import User from "#models/User.js";

const requireAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: "Please Login first" });
        }

        const decodedMsg = await jwt.verify(token, process.env.JWT_SECRET);
        const { id, tenantId, role } = decodedMsg;

        // Verify token matches current tenant context
        if (tenantId !== req.tenant._id.toString()) {
            return res.status(403).json({ error: "Access denied: Invalid tenant context" });
        }

        const user = await User.findOne({ _id: id, tenantId: req.tenant._id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
};

export default requireAuth;
