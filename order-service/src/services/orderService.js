const { getProduct } = require("../Clients/productClient");
const Order = require("../models/Order");

const createOrder = async (req) => {

    const { productId } = req.body;

    const userId = req.user.userId;

    const product = await getProduct(productId);

    const order = await Order.create({
        userId,
        productId: product._id,
    });

    return {
        message: "Order created successfully",
        order,
        product,
    };
};

const getOrders = async (req) => {
    const userId = req.user.userId
    const orders = await Order.find({
        userId
    })
    const enrichedOrders = await Promise.all(
        orders.map(async (order) => {
            const product = await getProduct(order.productId)
            return {
                ...order.toObject(),
                product,
            }
        })
    )
    return enrichedOrders
}

module.exports = { createOrder, getOrders };