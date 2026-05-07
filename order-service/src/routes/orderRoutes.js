const express = require("express")
const router = require("express").Router();
const {createOrderHandler} = require("../controllers/orderController");
const verifyToken = require('../middleware/authMiddleware')
const validate = require('../middleware/validate')
const {orderSchema} = require('../validators/orderValidator')

router.post("/",verifyToken,validate(orderSchema),createOrderHandler);

module.exports = router