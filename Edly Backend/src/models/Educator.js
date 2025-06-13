const mongoose = require("mongoose")

const educatorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: {type: String, unique: true},
    password: String,
    subdomain: { type: String, unique: true },
    bio: String,
    organization: String,
});

export default mongoose.Model("Educator", educatorSchema);