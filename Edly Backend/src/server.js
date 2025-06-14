const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

const connectDb = require("./config/database");
const authEducatorRoutes = require("./routes/authEducatorRoutes");

dotenv.config();
app.use(express.json());
app.use(cors({
    http: true
}))

app.use("/", authEducatorRoutes);

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

