// server/app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const loginRoute = require("./routes/loginRoute"); // adjust path if different
const taskRoutes = require("./routes/taskRoutes"); // adjust path if different
const rulesRoutes = require("./routes/rulesRoutes"); // adjust path if different
const journalRoutes = require("./routes/journalRoutes"); // adjust path if different
const magicRoutes = require("./routes/magicRoutes"); // adjust path if different

const app = express();
app.use(express.json());

// CORS (allow localhost + your Vercel domains)
const allowlist = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, //  your production frontend
].filter(Boolean);

const corsOptions = {
  origin: (origin, cb) => {
    // allow curl/postman/no-origin
    if (!origin) return cb(null, true);

    // exact allowlist
    if (allowlist.includes(origin)) return cb(null, true);

    // allow any vercel preview domain
    if (origin.endsWith(".vercel.app")) return cb(null, true);

    // IMPORTANT: return error BUT we will catch it in error handler
    return cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));

//  IMPORTANT: handle preflight properly (OPTIONS)
app.options("*", cors(corsOptions));

//  quick health check to confirm backend is alive
app.get("/health", (req, res) => res.status(200).send("ok"));

//  REGISTER ROUTES (THIS IS THE PART MOST PEOPLE MISS)
loginRoute(app);               // /login, /register
app.use("/tasks", taskRoutes); // /tasks...
app.use("/rules", rulesRoutes); // /rules...
app.use("/journal", journalRoutes); // /journal/notes...
app.use("/magic", magicRoutes); // /magic/:day...

//  Error handler so CORS errors don't become silent 502s
app.use((err, req, res, next) => {
  console.error("APP ERROR:", err.message);
  res.status(500).json({ message: err.message || "Server error" });
});

// Railway needs process.env.PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on", PORT));
