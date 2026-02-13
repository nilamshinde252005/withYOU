// server/app.js
require("dotenv").config(); // ✅ MUST be first

const express = require("express");
const cors = require("cors");

const app = express();

// allow your Vercel site + localhost
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean); // ✅ remove undefined

app.use(
  cors({
    origin: function (origin, cb) {
      // allow curl/postman (no origin) + allowed sites
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ ROUTES (after dotenv + middleware)
require("./routes/secure/userDataRoute")(app);
require("./routes/loginRoute")(app);

app.get("/", (_req, res) => res.send("API running ✅"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
