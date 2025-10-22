// app.js (CommonJS)
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// --- API routes (yours) ---
require("./routes/loginRoute")(app);
require("./routes/secure/userDataRoute")(app);

// --- Serve Vite build (dist) ---
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// SPA fallback (React Router refresh-safe)
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
