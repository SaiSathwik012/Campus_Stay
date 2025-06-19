const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerStudent = async (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    const fields = {};

    if (!name) fields.name = "Name is required";
    if (!email) fields.email = "Email is required";
    if (!phone) fields.phone = "Phone is required";
    if (!password) fields.password = "Password is required";
    if (password !== confirmPassword) fields.confirmPassword = "Passwords do not match";

    if (Object.keys(fields).length > 0) {
        return res.status(400).json({ success: false, fields });
    }

    try {
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        return res.status(201).json({ success: true, message: "Registration successful", student });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.loginStudent = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({ success: true, token, student });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
