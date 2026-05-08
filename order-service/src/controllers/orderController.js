const { createOrder, getOrders } = require("../services/orderService");

const createOrderHandler = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;
  const result = await createOrder(userId, productId);
  res.status(201).json({ success: true, message: "Order created successfully", data: result });
};

const getOrdersHandler = async (req, res) => {
  const userId = req.user.userId;
  const orders = await getOrders(userId);
  res.status(200).json({ success: true, message: "Orders fetched successfully", data: orders });
};

module.exports = { createOrderHandler, getOrdersHandler };