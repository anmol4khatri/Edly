import jwt from "jsonwebtoken";
import User from "#models/User.js";
import { UnauthorizedError, ForbiddenError, NotFoundError } from "#utils/errors.js";

const requireAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new UnauthorizedError("Please Login first"));
        }

        const decodedMsg = await jwt.verify(token, process.env.JWT_SECRET);
        const { id, tenantId, role } = decodedMsg;

        // Verify token matches current tenant context
        if (tenantId !== req.tenant._id.toString()) {
            return next(new ForbiddenError("Access denied: Invalid tenant context"));
        }

        const user = await User.findOne({ _id: id, tenantId: req.tenant._id });
        if (!user) {
            return next(new NotFoundError("User not found"));
        }

        req.user = user;
        next();
    } catch (err) {
        return next(new UnauthorizedError("Invalid Token"));
    }
};

export default requireAuth;
