import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";

import connectDb from "#config/database.js";
import errorHandler from "#middlewares/errorMiddleware.js";
import { requestLogger } from "#utils/logger.js";

// Routes
import authRoutes from "#routes/authRoutes.js";
import tenantRoutes from "#routes/tenantRoutes.js";
import courseRoutes from "#routes/courseRoutes.js";
import enrollmentRoutes from "#routes/enrollmentRoutes.js";

// Middlewares
import resolveTenant from "#middlewares/resolveTenant.js";

dotenv.config();
const app = express();

// Security Headers
app.use(helmet());

// Request Logging
app.use(requestLogger);

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api/auth", limiter); // Apply specifically to auth routes

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(compression());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Apply Tenant Resolution Globally
app.use(resolveTenant);




// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", tenant: req.tenant?.subdomain }));

// Global Error Handler
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDb();
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log("Server is running at PORT: " + port);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
