const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId:String,
    productId:String,
})

module.exports = mongoose.model("Order", orderSchema)