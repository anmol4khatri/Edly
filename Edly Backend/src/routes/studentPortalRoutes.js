const express = require("express");
const router = express.Router();

const requireStudentAuth = require("../middlewares/requireStudentAuth");
const resolveEducatorFromSubdomain = require("../middlewares/resolveEducatorFromSubdomain");

// router.get("/testRoute", requireStudentAuth, resolveEducatorFromSubdomain, (req, res) => {
//     const data = req.resolveEducatorFromSubdomain;
//     const loggedInStudent = req.student;
//     console.log(loggedInStudent);
//     console.log(data);
//     res.send("accessed");
// })

module.exports = router;