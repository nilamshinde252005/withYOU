const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

// ✅ CORS (allow localhost + your Vercel domains)
const allowlist = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://with-you-five.vercel.app",
  "https://with-you-git-main-nilams-projects-b76e9d8f.vercel.app",
];

// ✅ ALSO allow any *.vercel.app preview deployments automatically
app.use(
  cors({
    origin: (origin, cb) => {
      // allow curl/postman/no-origin
      if (!origin) return cb(null, true);

      // exact allowlist
      if (allowlist.includes(origin)) return cb(null, true);

      // allow any vercel preview domain
      if (origin.endsWith(".vercel.app")) return cb(null, true);

      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
