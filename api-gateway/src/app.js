const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")


const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/orders",orderRoutes)

app.get("/",(req,res)=>{
    res.send("API gateway is running")
})

module.exports = app