const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_EMAIL = "saisathwik012@gmail.com";
const ADMIN_PASSWORD = "nithu7475";
const JWT_SECRET = process.env.JWT_SECRET;

// @route POST /api/admin/login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            success: true,
            message: "Admin login successful",
            token,
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
    });
});

module.exports = router;
