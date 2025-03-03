const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
const cors = require("cors");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(8080, () => console.log(`Server running on 8080`));
