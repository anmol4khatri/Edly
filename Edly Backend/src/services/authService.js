import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "#models/User.js";
import { ValidationError, ConflictError, UnauthorizedError } from "#utils/errors.js";

class AuthService {
    async register(tenantId, data) {
        const { firstName, lastName, email, password, confirmPassword, role } = data;

        if (!validator.isEmail(email)) {
            throw new ValidationError("Invalid Email");
        }
        if (!validator.isStrongPassword(password)) {
            throw new ValidationError("Choose a strong password");
        }
        if (password !== confirmPassword) {
            throw new ValidationError("Passwords do not match");
        }

        const existingAccount = await User.findOne({ email, tenantId });
        if (existingAccount) {
            throw new ConflictError("Account already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            tenantId,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || 'student'
        });

        const savedUser = await newUser.save();

        const token = this.generateToken(savedUser);

        const userResponse = savedUser.toObject();
        delete userResponse.password;

        return { user: userResponse, token };
    }

    async login(tenantId, email, password) {
        if (!email || !validator.isEmail(email)) {
            throw new ValidationError("Invalid Email");
        }
        if (!password) {
            throw new ValidationError("Password is required");
        }

        const user = await User.findOne({ email, tenantId });
        if (!user) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const token = this.generateToken(user);

        const userResponse = user.toObject();
        delete userResponse.password;

        return { user: userResponse, token };
    }

    generateToken(user) {
        return jwt.sign(
            { id: user._id, tenantId: user.tenantId, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
    }
}

export const authService = new AuthService();
