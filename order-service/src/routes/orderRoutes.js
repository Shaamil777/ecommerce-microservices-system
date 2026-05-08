const router = require("express").Router();
const { createOrderHandler, getOrdersHandler } = require("../controllers/orderController");
const verifyToken = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { orderSchema } = require("../validators/orderValidator");
const asyncHandler = require("../middleware/asyncHandler");

router.post("/", verifyToken, validate(orderSchema), asyncHandler(createOrderHandler));
router.get("/", verifyToken, asyncHandler(getOrdersHandler));

module.exports = router;