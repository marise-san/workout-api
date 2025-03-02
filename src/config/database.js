const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
  ssl: { rejectUnauthorized: false },
  port: process.env.PORT
});

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.DATABASE_URL?.includes("railway") ? { rejectUnauthorized: false } : false,
//   port: process.env.DATABASE_PORT
// });

pool.connect()
  .then(() => console.log("Database connected succefully!"))
  .catch((err) => console.error("Connection failed:", err));

module.exports = pool;
