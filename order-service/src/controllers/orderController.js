const {createOrder} = require("../services/orderService")

const createOrderHandler = async(req, res)=>{
    const result = await createOrder(req)
    res.json(result)
}

module.exports = {createOrderHandler}