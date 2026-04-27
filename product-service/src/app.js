const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const productRoutes = require("./routes/productRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products",productRoutes)


module.exports = app