const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

const connectDb = require("./config/database");

// Routes
const authRoutes = require("./routes/authRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

// Middlewares
const resolveTenant = require("./middlewares/resolveTenant");

dotenv.config();

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
    })
