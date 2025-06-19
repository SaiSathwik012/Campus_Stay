const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Create transporter outside the route handler
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify transporter connection
transporter.verify((error) => {
    if (error) {
        console.error("Nodemailer transporter error:", error);
    } else {
        console.log("Nodemailer is ready to send emails");
    }
});

router.post("/", async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Save to database
        const contact = new Contact({ name, email, subject, message });
        await contact.save();

        // Email options
        const mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: "saisathwik012@gmail.com",
            subject: `New Contact Form: ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #4f46e5;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line; background: #f3f4f6; padding: 10px; border-radius: 5px;">${message}</p>
          <p style="margin-top: 20px; color: #6b7280; font-size: 0.9em;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
            text: `
        New Contact Form Submission\n
        Name: ${name}\n
        Email: ${email}\n
        Subject: ${subject}\n
        Message:\n
        ${message}\n\n
        This message was sent from your website contact form.
      `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Message sent and saved successfully"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send or save message",
            error: process.env.NODE_ENV === "development" ? error.message : undefined
        });
    }
});

module.exports = router;