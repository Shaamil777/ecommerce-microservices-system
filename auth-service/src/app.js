const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const errorMiddleware = require("./middleware/errorMiddleware")
const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use(errorMiddleware)

module.exports = app