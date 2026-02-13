// server/app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const loginRoute = require("./routes/loginRoute");
const userDataRoute = require("./routes/secure/userDataRoute");

const app = express();
app.use(express.json());

//  CORS
const allowlist = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, // set on Railway
].filter(Boolean);

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowlist.includes(origin)) return cb(null, true);
    if (origin.endsWith(".vercel.app")) return cb(null, true);
    return cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));

// app.options("*", cors(corsOptions));


app.get("/health", (req, res) => res.status(200).send("ok"));

// Register only existing routes
loginRoute(app);
userDataRoute(app);

// Error handler (so CORS errors show properly)
app.use((err, req, res, next) => {
  console.error("APP ERROR:", err.message);
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on", PORT));
