// controllers/userController.js
const jwt = require('jsonwebtoken');
const userInformation = require('./userDB');

const JWT_SECRET = process.env.JWT_SECRET || 'HyperionDev'; // one source of truth

// ---------- AUTH ----------

// LOGIN - accepts either GET query params OR POST JSON body
const userController = (req, res) => {
  const username = req.body?.username ?? req.query?.username;
  const password = req.body?.password ?? req.query?.password;

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  const user = userInformation.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: 'incorrect username or password' });
  }

  const payload = { name: username, admin: false };
  const token = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });

  console.log(`User ${username} logged in`);
  return res.status(200).json({ message: `Welcome back ${username}`, token });
};

// REGISTER - expects POST /register with JSON body { username, password }
function registerController(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  const exists = userInformation.find((u) => u.username === username);
  if (exists) {
    return res.status(409).json({ message: 'account with that email already exists' });
  }

  const newUser = {
    username,
    password,        // plaintext because your DB is in-memory
    todos: [],
    userRules: [],   // single-string slot (index 0)
    journalNotes: [],// list of notes
    magicEntries: {} // { "1": {text, updatedAt}, ... }
  };
  userInformation.push(newUser);

  const payload = { name: username, admin: false };
  const token = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });

  console.log(`User ${username} registered`);
  return res.status(201).json({ message: 'Account created', token });
}

// ---------- HELPERS ----------
function getUserFromPayload(req, res) {
  const username = req.payload?.name;
  const user = userInformation.find(u => u.username === username);
  if (!user) { res.status(404).json({ message: 'User not found' }); return null; }
  return user;
}

// ---------- TODOS ----------
const getToDos = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  res.json(user.todos);
};

const addToDo = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: 'task is required' });

  const newTask = { id: Date.now().toString(), task, status: 'Working', dueDate: null };
  user.todos.push(newTask);
  res.json({ message: 'Task added', task: newTask });
};

const updateToDo = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  const { id } = req.params;
  const { task, status, dueDate } = req.body;

  const todo = user.todos.find(t => t.id === String(id));
  if (!todo) return res.status(404).json({ message: 'Task not found' });

  if (task !== undefined) todo.task = task;
  if (status !== undefined) todo.status = status;
  if (dueDate !== undefined) todo.dueDate = dueDate;

  res.json({ message: 'Task updated', todo });
};

const deleteToDo = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  const { id } = req.params;

  const before = user.todos.length;
  user.todos = user.todos.filter(t => t.id !== String(id));
  if (user.todos.length === before) return res.status(404).json({ message: 'Task not found' });

  res.json({ message: 'Task deleted' });
};

// ---------- RULES (single text entry) ----------
const getRules = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  const existingRule = user.userRules?.[0] || '';
  res.status(200).json({ rule: existingRule });
};

const addOrUpdateRules = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  const newRuleText = req.body?.rule ?? '';
  user.userRules = [newRuleText]; // overwrite previous, keep one slot only
  res.json({ message: 'Rule saved', rule: newRuleText });
};

// ---------- JOURNAL NOTES ----------
function ensureJournalArray(user) {
  if (!user.journalNotes) user.journalNotes = [];
}

const getJournalNotes = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  ensureJournalArray(user);
  const { type } = req.query; // heavy|light optional
  const notes = user.journalNotes.filter(n => !type || n.type === type);
  notes.sort((a, b) => b.updatedAt - a.updatedAt);
  res.json(notes);
};

const createJournalNote = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  ensureJournalArray(user);
  const { title = '', body = '', date, type = 'heavy' } = req.body;
  const id = Date.now().toString();
  const note = { id, title, body, date, type, updatedAt: Date.now() };
  user.journalNotes.push(note);
  res.status(201).json(note);
};

const getJournalNoteById = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  ensureJournalArray(user);
  const note = user.journalNotes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ message: 'Not found' });
  res.json(note);
};

const updateJournalNote = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  ensureJournalArray(user);
  const { id } = req.params;
  const i = user.journalNotes.findIndex(n => n.id === id);
  if (i < 0) return res.status(404).json({ message: 'Not found' });
  user.journalNotes[i] = { ...user.journalNotes[i], ...req.body, updatedAt: Date.now() };
  res.json(user.journalNotes[i]);
};

// ---------- MAGIC 28-DAY ENTRIES ----------
function ensureMagic(user) {
  if (!user.magicEntries) user.magicEntries = {};
}

const getMagicEntry = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  ensureMagic(user);

  const day = parseInt(req.params.day, 10);
  if (Number.isNaN(day) || day < 1 || day > 28) {
    return res.status(400).json({ message: 'day must be between 1 and 28' });
  }
  const entry = user.magicEntries[String(day)] || { text: '', updatedAt: null };
  res.json({ day, ...entry });
};

const upsertMagicEntry = (req, res) => {
  const user = getUserFromPayload(req, res); if (!user) return;
  ensureMagic(user);

  const day = parseInt(req.params.day, 10);
  if (Number.isNaN(day) || day < 1 || day > 28) {
    return res.status(400).json({ message: 'day must be between 1 and 28' });
  }

  const { text = '' } = req.body;
  const now = Date.now();
  user.magicEntries[String(day)] = { text, updatedAt: now };

  res.json({ message: `Day ${day} entry saved`, day, text, updatedAt: now });
};

module.exports = {
  // auth
  userController,
  registerController,
  // todos
  getToDos,
  addToDo,
  updateToDo,
  deleteToDo,
  // rules
  getRules,
  addOrUpdateRules,
  // journal
  getJournalNotes,
  createJournalNote,
  getJournalNoteById,
  updateJournalNote,
  // magic
  getMagicEntry,
  upsertMagicEntry,
};
