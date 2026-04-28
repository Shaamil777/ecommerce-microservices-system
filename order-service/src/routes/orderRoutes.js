const express = require("express")
const router = require("express").Router();
const {createOrderHandler} = require("../controllers/orderController");
const Order = require("../models/Order")

router.post("/",createOrderHandler);

module.exports = router