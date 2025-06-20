const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fileUpload = require('express-fileupload');
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true
}));
app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const studentRoutes = require("./routes/studentRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const roomRoutes = require('./routes/roomRoutes');
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes"); // Add this line

app.use("/api/student", studentRoutes);
app.use("/api/owner", ownerRoutes);
app.use('/api/rooms', roomRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes); // Add this line

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));