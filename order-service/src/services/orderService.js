const { getProduct } = require("../clients/productClient");
const Order = require("../models/Order");

const createOrder = async (userId, productId) => {
  const product = await getProduct(productId);

  const order = await Order.create({
    userId,
    productId: product._id,
  });

  return { order, product };
};

const getOrders = async (userId) => {
  const orders = await Order.find({ userId });

  const enrichedOrders = await Promise.all(
    orders.map(async (order) => {
      const product = await getProduct(order.productId);
      return { ...order.toObject(), product };
    })
  );

  return enrichedOrders;
};

module.exports = { createOrder, getOrders };