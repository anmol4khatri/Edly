const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const connectDb = require("./config/database");
const errorHandler = require("./middlewares/errorMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

// Middlewares
const resolveTenant = require("./middlewares/resolveTenant");

dotenv.config();
const app = express();

// Security Headers
app.use(helmet());

// Data Sanitization
app.use(mongoSanitize());

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
