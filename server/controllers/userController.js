// server/controllers/userController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sql = require("../db");

const JWT_SECRET = process.env.JWT_SECRET || "HyperionDev";

// ---------- AUTH ----------
async function userController(req, res) {
  try {
    // Support both GET and POST (but frontend should use POST)
    const username =
      req.body?.username ?? req.query?.username;
    const password =
      req.body?.password ?? req.query?.password;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    }

    const rows = await sql`
      select email, password, data
      from users
      where email = ${username}
      limit 1
    `;

    const userRow = rows[0];

    if (!userRow) {
      return res
        .status(401)
        .json({ message: "incorrect username or password" });
    }

    // 🔥 Safe bcrypt compare (prevents 500)
    let passwordMatch = false;
    try {
      passwordMatch = await bcrypt.compare(
        password,
        userRow.password
      );
    } catch (bcryptError) {
      console.error("BCRYPT ERROR:", bcryptError?.message);
      return res
        .status(401)
        .json({ message: "incorrect username or password" });
    }

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "incorrect username or password" });
    }

    const token = jwt.sign(
      { name: username, admin: false },
      JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "7d",
      }
    );

    return res.json({ message: "Login success", token });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

async function registerController(req, res) {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    }

    const exists = await sql`
      select 1 from users where email = ${username} limit 1
    `;

    if (exists.length) {
      return res
        .status(409)
        .json({ message: "account with that email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const initialData = {
      todos: [],
      userRules: [""],
      journalNotes: [],
      magicEntries: {},
    };

    await sql`
      insert into users (email, password, data)
      values (
        ${username},
        ${hashed},
        ${JSON.stringify(initialData)}::jsonb
      )
    `;

    const token = jwt.sign(
      { name: username, admin: false },
      JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      message: "Account created",
      token,
    });
  } catch (e) {
    console.error("REGISTER ERROR:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

// ---------- HELPERS ----------
async function getUserDataByEmail(email) {
  const rows = await sql`
    select data from users where email = ${email} limit 1
  `;
  return rows[0]?.data ?? null;
}

async function saveUserDataByEmail(email, data) {
  await sql`
    update users
    set data = ${JSON.stringify(data)}::jsonb,
        updated_at = now()
    where email = ${email}
  `;
}

function getEmailFromPayload(req, res) {
  const email = req.payload?.name;
  if (!email) {
    res.status(403).json({ message: "Missing payload" });
    return null;
  }
  return email;
}

module.exports = {
  userController,
  registerController,

  getToDos,
  addToDo,
  updateToDo,
  deleteToDo,

  getRules,
  addOrUpdateRules,

  getJournalNotes,
  createJournalNote,
  getJournalNoteById,
  updateJournalNote,

  getMagicEntry,
  upsertMagicEntry,
};
