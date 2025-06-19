
const Owner = require("../models/Owner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registerOwner = async (req, res) => {
    try {
        const { name, email, password, mobile, avatar } = req.body;

        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: "Owner already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const owner = await Owner.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            avatar
        });

        res.status(201).json({
            _id: owner._id,
            name: owner.name,
            email: owner.email,
            mobile: owner.mobile,
            avatar: owner.avatar,
            token: generateToken(owner._id)
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.loginOwner = async (req, res) => {
    try {
        const { email, password } = req.body;
        const owner = await Owner.findOne({ email });

        if (!owner) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({
            _id: owner._id,
            name: owner.name,
            email: owner.email,
            mobile: owner.mobile,
            avatar: owner.avatar,
            token: generateToken(owner._id)
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};