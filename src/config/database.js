const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_RAILWAY_URL,
  ssl: process.env.DB_RAILWAY_URL?.includes("railway") ? { rejectUnauthorized: false } : false,
  port: process.env.DB_RAILWAY_PORT
});

pool.connect()
  .then(() => console.log("Database connected succefully!"))
  .catch((err) => console.error("Connection failed:", err));

module.exports = pool;
