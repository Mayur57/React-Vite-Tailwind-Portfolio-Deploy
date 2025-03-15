const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://react-vite-tailwind-portfolio.vercel.app",
  "https://react-vite-tailwind-portfolio-deploy.vercel.app",
  "http://localhost:5173"  // For local development
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true
}));

// Location Tracking Middleware
app.use(async (req, res, next) => {
  let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    console.log("Skipping location tracking for localhost.");
    return next();
  }
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    if (response.data.status !== "success") throw new Error("IP lookup failed.");

    const locationData = {
      city: response.data.city || "Unknown",
      country: response.data.country || "Unknown",
      timestamp: new Date().toISOString(),
    };
    fs.writeFileSync("visitor.json", JSON.stringify(locationData, null, 2));
    console.log("Visitor location updated:", locationData);
  } catch (error) {
    console.error("Error fetching IP location:", error);
  }
  next();
});

// API Routes
app.get("/api/last-visitor", (req, res) => {
  if (fs.existsSync("visitor.json")) {
    const data = JSON.parse(fs.readFileSync("visitor.json", "utf-8"));
    return res.json(data);
  }
  res.json({ city: "Unknown", country: "Unknown", timestamp: null });
});

app.post("/api/send", async (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    text: `Email: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email Sent Successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
