const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(express.json());

// Allow any origin (or specify your frontend domain)
app.use(cors({
  origin: "*",  // Change "*" to your frontend domain if needed
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
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
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
