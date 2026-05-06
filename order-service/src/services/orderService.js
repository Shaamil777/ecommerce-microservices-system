const {getProduct} = require("../Clients/productClient");
const Order = require("../models/Order");

const createOrder = async (req)=>{
        const {productId} = req.body


        const userId =  req.user.userId
        const product = await getProduct(productId)
        
        const order = await Order.create({
            userId,
            productId:product._id
        });

        return {
            message:"Order created successfully",
            order,
            product,
        }
};

module.exports = {createOrder};
