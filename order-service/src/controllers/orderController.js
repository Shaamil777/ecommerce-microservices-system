const {createOrder} = require("../services/orderService")

const createOrderHandler = async(req, res)=>{
    try {
        const result = await createOrder(req)
        res.json(result)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {createOrderHandler}