import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import connectDb from "#config/database.js";
import errorHandler from "#middlewares/errorMiddleware.js";

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

// Temp Logger
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.originalUrl || req.url}`);
    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const color = status >= 400 ? '\x1b[31m' : '\x1b[32m'; // Red for error, Green for success
        const reset = '\x1b[0m';

        console.log(`${color}[${new Date().toISOString()}] ${req.method} ${req.originalUrl || req.url} ${status} - ${duration}ms${reset}`);
    });
    next();
});

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use("/api/auth", limiter); // Apply specifically to auth routes

app.use(express.json());
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

connectDb()
    .then(() => {
        console.log("Connected to the Database");
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log("Server is running at PORT: " + port);
        });
    })
    .catch((err) => {
        console.error("Something went wrong while connecting to the database", err);
    });
