require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://www.harshbhoi.dev", "https://react-vite-tailwind-portfolio-deploy-nine.vercel.app"], // Allow frontend domains
    methods: "GET,POST",
    credentials: true, // Allows cookies, sessions, etc.
  })
);

// Email sending route
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Configure nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your Gmail address
      pass: process.env.PASSWORD, // App password
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL, // Your email to receive messages
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
app.post("/poke", async (req, res) => {
  // Configure nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your Gmail address
      pass: process.env.PASSWORD, // App password
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL, // Send to yourself
    subject: "Someone Poked You!",
    text: "Hey! Someone clicked the Poke button on your website!",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Poke notification sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send poke notification" });
  }
});require("dotenv").config();
/*const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); */
const axios = require("axios");
const fs = require("fs");

/*const app = express(); causing error because of redeclaration */
app.use(express.json());
app.use(
  cors({
    origin: ["https://www.harshbhoi.dev", "https://react-vite-tailwind-portfolio-deploy-nine.vercel.app"], // Allow frontend domains
    methods: "GET,POST",
    credentials: true, // Allows cookies, sessions, etc.
  })
);

const LOCATION_FILE = "visitor.json";

// **Middleware to Fetch and Store Visitor Location**
app.use(async (req, res, next) => {
  let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  // 🚀 Use a test IP if running locally
  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    console.log("Skipping location tracking for localhost request.");
    return next(); // Skips fetching location on local development
  }

  try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      
      if (response.data.status !== "success") {
          throw new Error("IP lookup failed.");
      }

      const locationData = {
          city: response.data.city || "Unknown",            
          country: response.data.country || "Unknown",
          timestamp: new Date().toISOString(),
      };

      // Store latest visitor info
      fs.writeFileSync("visitor.json", JSON.stringify(locationData, null, 2));

      console.log("Visitor location updated:", locationData);
  } catch (error) {
      console.error("Error fetching IP location:", error);
  }

  next();
});


// **API Route to Fetch Last Visitor**
app.get("/last-visitor", (req, res) => {
    if (fs.existsSync(LOCATION_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(LOCATION_FILE, "utf-8"));

            if (data.city && data.country) {
                return res.json(data);
            }
        } catch (error) {
            console.error("Error reading visitor.json:", error);
        }
    }
    
    // Default response if file is missing or data is invalid
    res.json({ city: "Unknown", country: "Unknown", timestamp: null });
});

// Email sending route
app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    let mailOptions = {
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

// Poke notification route
app.post("/poke", async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "Someone Poked You!",
        text: "Hey! Someone clicked the Poke button on your website!",
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Poke notification sent!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send poke notification" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



