const express = require("express");
const cors = require("cors");
require("dotenv").config();

const igdbRoutes = require("./routes/igdb");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/igdb", igdbRoutes);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
