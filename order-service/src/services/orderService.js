const {verifyUser} = require("../Clients/authClient");
const {getProduct} = require("../Clients/productClient");
const Order = require("../models/Order");

const createOrder = async (req)=>{
        const token = req.headers.authorization;
        const {productId} = req.body

        console.log("step 1: verifying User")
        const user = await verifyUser(token)

        console.log("step 2: getting Product")
        const product = await getProduct(productId)
        
        const order = await Order.create({
            userId:user.userId,
            productId:product._id
        });

        return {
            message:"Order created successfully",
            order,
            user,
            product,
        }
};

module.exports = {createOrder};
