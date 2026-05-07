const {createOrder,getOrders} = require("../services/orderService")

const createOrderHandler = async(req, res)=>{
    const result = await createOrder(req)
    res.json(result)
}

const getOrdersHandler = async(req,res)=>{
    const result = await getOrders(req)
    res.json(result)
}

module.exports = {createOrderHandler,getOrdersHandler}