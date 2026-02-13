// server/routes/secure/userDataRoute.js
const { jwtMiddleware } = require("../../middleware/jwtMiddleware");
const { checkGmailUser } = require("../../middleware/checkGmailUser");
const { requireJson } = require("../../middleware/requireJson");
const { limitTaskLength } = require("../../middleware/limitTaskLength");

const {
  getToDos, addToDo, deleteToDo, updateToDo,
  getRules, addOrUpdateRules,
  getJournalNotes, createJournalNote, getJournalNoteById, updateJournalNote,
  getMagicEntry, upsertMagicEntry,
} = require("../../controllers/userController");




const userDataRoute = (app) => {

  // TASKS
  app.get("/login/data", jwtMiddleware, getToDos);
  app.post("/tasks", jwtMiddleware, checkGmailUser, requireJson, limitTaskLength, addToDo);
  app.put("/tasks/:id", jwtMiddleware, checkGmailUser, requireJson, limitTaskLength, updateToDo);
  app.delete("/tasks/:id", jwtMiddleware, checkGmailUser, deleteToDo);

  // RULES
  app.get("/rules", jwtMiddleware, getRules);
  app.post("/rules", jwtMiddleware, requireJson, addOrUpdateRules);

  // JOURNAL NOTES
  app.get("/journal/notes", jwtMiddleware, getJournalNotes);
  app.post("/journal/notes", jwtMiddleware, requireJson, createJournalNote);
  app.get("/journal/notes/:id", jwtMiddleware, getJournalNoteById);
  app.put("/journal/notes/:id", jwtMiddleware, requireJson, updateJournalNote);

  // magic days-
  app.get("/magic/entries/:day", jwtMiddleware, getMagicEntry);
  app.put("/magic/entries/:day", jwtMiddleware, upsertMagicEntry);

  // OPTIONAL: safe route dump (won’t crash if nothing yet)
  if (app._router?.stack) {
    console.log(
      "Registered routes:",
      app._router.stack
        .filter(r => r.route)
        .map(r => `${Object.keys(r.route.methods).join(",").toUpperCase()} ${r.route.path}`)
    );
  } else {
    console.log("No routes registered yet (app._router is undefined).");
  }
};

module.exports = userDataRoute;
