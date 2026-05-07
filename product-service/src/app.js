const express = require("express")
const cors = require("cors")
const productRoutes = require("./routes/productRoutes")
const errorMiddleware = require("./middleware/errorMiddleware")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products",productRoutes)

app.use(errorMiddleware)

module.exports = app