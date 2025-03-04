const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  port: process.env.DB_PORT
});

pool.connect()
  .then(() => console.log("Database connected succefully!"))
  .catch((err) => console.error("Connection failed:", err));

module.exports = pool;
