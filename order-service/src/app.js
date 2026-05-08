const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use(errorMiddleware);

module.exports = app;