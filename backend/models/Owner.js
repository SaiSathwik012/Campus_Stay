// backend/models/Owner.js
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Owner", ownerSchema);
