const express = require("express")
const router = require("express").Router();
const {createOrderHandler} = require("../controllers/orderController");
const Order = require("../models/Order")
const verifyToken = require('../middleware/authMiddleware')

router.post("/",verifyToken,createOrderHandler);

module.exports = router