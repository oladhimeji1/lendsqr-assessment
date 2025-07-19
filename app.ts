import express from "express";
import dotenv from "dotenv";
const cors = require("cors");

import userRoutes from "./routes/user.routes";
import walletRoutes from "./routes/wallet.routes";


import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/docs/swagger";

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", walletRoutes);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
