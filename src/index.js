const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const userRoutes = require("./routes/user");

dotenv.config();
const app = express();
app.use(express.json());

const swaggerDocument = require("./config/swagger.json");

app.use("/user", userRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
