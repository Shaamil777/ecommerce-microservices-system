const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const orderRoutes = require("./routes/orderRoutes")
const errorMiddleware = require("./middleware/errorMiddleware")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/orders",orderRoutes)

app.get("/",(req,res)=>{
    res.send("order service is running")
})

app.use(errorMiddleware)

module.exports = app