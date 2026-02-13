require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Set it in server/.env or Railway Variables.");
}

const sql = neon(process.env.DATABASE_URL);

module.exports = sql;
