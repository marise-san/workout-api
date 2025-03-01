const express = require("express");
const dotenv = require("dotenv");
const pool = require("./config/database");

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API started successfully!");
});


app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
