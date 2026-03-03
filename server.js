
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const paymentRoutes = require("./routes/payment");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client")));
app.use("/api/payment", paymentRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Server Running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
