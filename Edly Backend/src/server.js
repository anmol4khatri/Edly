const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

const connectDb = require("./config/database");
const authEducatorRoutes = require("./routes/authEducatorRoutes");
const onBoardingRoute = require("./routes/onBoardingRoute");

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    http: true
}))

app.use("/", authEducatorRoutes);
app.use("/", onBoardingRoute);

connectDb()
    .then(() => {
        console.log("Connected to the Database");
        app.listen(process.env.PORT, () => {
            console.log("Server is running at PORT: " + process.env.PORT);
        });
    })
    .catch(() => {
        console.error("Something went wrong while connecting to the database");
    })

