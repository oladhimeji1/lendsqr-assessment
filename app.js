const express = require("express");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use("/api/v1", userRoutes);

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
