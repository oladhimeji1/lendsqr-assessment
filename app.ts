import express from "express";
import dotenv from "dotenv";
const cors = require("cors");

import userRoutes from "./routes/user.routes";
import walletRoutes from "./routes/wallet.routes";

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/wallets", walletRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
