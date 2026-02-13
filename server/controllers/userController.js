// server/controllers/userController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sql = require("../db");

const JWT_SECRET = process.env.JWT_SECRET || "HyperionDev";

// ---------- AUTH ----------
async function userController(req, res) {
  try {
    const { username, password } =
      req.method === "GET" ? req.query : req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const rows = await sql`
      select email, password, data
      from users
      where email = ${username}
      limit 1
    `;

    const userRow = rows[0];
    if (!userRow) {
      return res.status(401).json({ message: "incorrect username or password" });
    }

    const ok = await bcrypt.compare(password, userRow.password);
    if (!ok) {
      return res.status(401).json({ message: "incorrect username or password" });
    }

    const token = jwt.sign({ name: username, admin: false }, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

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
      return res.status(400).json({ message: "username and password are required" });
    }

    const exists = await sql`
      select 1 from users where email = ${username} limit 1
    `;
    if (exists.length) {
      return res.status(409).json({ message: "account with that email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // initial JSONB structure that matches your app
    const initialData = {
      todos: [],
      userRules: [""],       // single-string slot
      journalNotes: [],      // unified notes array
      magicEntries: {},      // { "1": {text, updatedAt}, ... }
    };

    await sql`
      insert into users (email, password, data)
      values (${username}, ${hashed}, ${JSON.stringify(initialData)}::jsonb)
    `;

    const token = jwt.sign({ name: username, admin: false }, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    return res.status(201).json({ message: "Account created", token });
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

// ---------- TODOS ----------
const getToDos = async (req, res) => {
  const email = getEmailFromPayload(req, res); if (!email) return;
  const data = await getUserDataByEmail(email);
  if (!data) return res.status(404).json({ message: "User not found" });
  res.json(data.todos || []);
};

const addToDo = async (req, res) => {
  const email = getEmailFromPayload(req, res); if (!email) return;
  const data = await getUserDataByEmail(email);
  if (!data) return res.status(404).json({ message: "User not found" });

  const { task } = req.body || {};
  if (!task) return res.status(400).json({ message: "task is required" });

  const newTask = { id: Date.now().toString(), task, status: "Working", dueDate: null };
  data.todos = data.todos || [];
  data.todos.push(newTask);

  await saveUserDataByEmail(email, data);
  res.json({ message: "Task added", task: newTask });
};

const updateToDo = async (req, res) => {
  const email = getEmailFromPayload(req, res); if (!email) return;
  const data = await getUserDataByEmail(email);
  if (!data) return res.status(404).json({ message: "User not found" });

  const { id } = req.params;
  const { task, status, dueDate } = req.body || {};

  data.todos = data.todos || [];
  const todo = data.todos.find(t => t.id === String(id));
  if (!todo) return res.status(404).json({ message: "Task not found" });

  if (task !== undefined) todo.task = task;
  if (status !== undefined) todo.status = status;
  if (dueDate !== undefined) todo.dueDate = dueDate;

  await saveUserDataByEmail(email, data);
  res.json({ message: "Task updated", todo });
};

const deleteToDo = async (req, res) => {
  const email = getEmailFromPayload(req, res); if (!email) return;
  const data = await getUserDataByEmail(email);
  if (!data) return res.status(404).json({ message: "User not found" });

  const { id } = req.params;
  const before = (data.todos || []).length;
  data.todos = (data.todos || []).filter(t => t.id !== String(id));
  if (data.todos.length === before) return res.status(404).json({ message: "Task not found" });

  await saveUserDataByEmail(email, data);
  res.json({ message: "Task deleted" });
};

// ---------- RULES ----------
const getRules = async (req, res) => {
  const email = getEmailFromPayload(req, res); if (!email) return;
  const data = await getUserDataByEmail(email);
  if (!data) return res.status(404).json({ message: "User not found" });

  const existingRule = data.userRules?.[0] || "";
  res.json({ rule: existingRule });
};

const addOrUpdateRules = async (req, res) => {
  const email = getEmailFromPayload(req, res); if (!email) return;
  const data = await getUserDataByEmail(email);
  if (!data) return res.status(404).json({ message: "User not found" });

  const newRuleText = req.body?.rule ?? "";
  data.userRules = [newRuleText];

  await saveUserDataByEmail(email, data);
  res.json({ message: "Rule saved", rule: newRuleText });
};

// ---------- MAGIC ----------
const getMagicEntry = async (req, res) => {
  const email = getEmailFromPayload(req, res); if (!email) return;
  const data = await getUserDataByEmail(email);
  if (!data) return res.status(404).json({ message: "User not found" });

  const day = parseInt(req.params.day, 10);
  if (Number.isNaN(day) || day < 1 || day > 28) {
    return res.status(400).json({ message: "day must be between 1 and 28" });
  }

  data.magicEntries = data.magicEntries || {};
  const entry = data.magicEntries[String(day)] || { text: "", updatedAt: null };
  res.json({ day, ...entry });
};

const upsertMagicEntry = async (req, res) => {
  const email = getEmailFromPayload(req, res); if (!email) return;
  const data = await getUserDataByEmail(email);
  if (!data) return res.status(404).json({ message: "User not found" });

  const day = parseInt(req.params.day, 10);
  if (Number.isNaN(day) || day < 1 || day > 28) {
    return res.status(400).json({ message: "day must be between 1 and 28" });
  }

  const { text = "" } = req.body || {};
  const now = Date.now();

  data.magicEntries = data.magicEntries || {};
  data.magicEntries[String(day)] = { text, updatedAt: now };

  await saveUserDataByEmail(email, data);
  res.json({ message: `Day ${day} entry saved`, day, text, updatedAt: now });
};

// ---------- JOURNAL NOTES ----------
async function ensureJournalStructure(data) {
  if (!data.journalNotes) data.journalNotes = [];
}

const getJournalNotes = async (req, res) => {
  try {
    const email = req.payload?.name;
    if (!email) return res.status(403).json({ message: "Missing payload" });

    const rows = await sql`select data from users where email = ${email} limit 1`;
    const data = rows[0]?.data;
    if (!data) return res.status(404).json({ message: "User not found" });

    await ensureJournalStructure(data);

    const { type } = req.query; // heavy|light optional
    const notes = (data.journalNotes || []).filter(n => !type || n.type === type);
    notes.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

    return res.json(notes);
  } catch (e) {
    console.error("getJournalNotes error:", e);
    return res.status(500).json({ message: "Server error" });
  }
};

const createJournalNote = async (req, res) => {
  try {
    const email = req.payload?.name;
    if (!email) return res.status(403).json({ message: "Missing payload" });

    const rows = await sql`select data from users where email = ${email} limit 1`;
    const data = rows[0]?.data;
    if (!data) return res.status(404).json({ message: "User not found" });

    await ensureJournalStructure(data);

    const { title = "", body = "", date = null, type = "heavy" } = req.body || {};
    const id = Date.now().toString();
    const note = { id, title, body, date, type, updatedAt: Date.now() };

    data.journalNotes.push(note);

    await sql`
      update users
      set data = ${JSON.stringify(data)}::jsonb, updated_at = now()
      where email = ${email}
    `;

    return res.status(201).json(note);
  } catch (e) {
    console.error("createJournalNote error:", e);
    return res.status(500).json({ message: "Server error" });
  }
};

const getJournalNoteById = async (req, res) => {
  try {
    const email = req.payload?.name;
    if (!email) return res.status(403).json({ message: "Missing payload" });

    const rows = await sql`select data from users where email = ${email} limit 1`;
    const data = rows[0]?.data;
    if (!data) return res.status(404).json({ message: "User not found" });

    await ensureJournalStructure(data);

    const note = (data.journalNotes || []).find(n => n.id === req.params.id);
    if (!note) return res.status(404).json({ message: "Not found" });

    return res.json(note);
  } catch (e) {
    console.error("getJournalNoteById error:", e);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateJournalNote = async (req, res) => {
  try {
    const email = req.payload?.name;
    if (!email) return res.status(403).json({ message: "Missing payload" });

    const rows = await sql`select data from users where email = ${email} limit 1`;
    const data = rows[0]?.data;
    if (!data) return res.status(404).json({ message: "User not found" });

    await ensureJournalStructure(data);

    const { id } = req.params;
    const i = (data.journalNotes || []).findIndex(n => n.id === id);
    if (i < 0) return res.status(404).json({ message: "Not found" });

    data.journalNotes[i] = {
      ...data.journalNotes[i],
      ...req.body,
      updatedAt: Date.now(),
    };

    await sql`
      update users
      set data = ${JSON.stringify(data)}::jsonb, updated_at = now()
      where email = ${email}
    `;

    return res.json(data.journalNotes[i]);
  } catch (e) {
    console.error("updateJournalNote error:", e);
    return res.status(500).json({ message: "Server error" });
  }
};


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
