const express = require("express")
const router = require("express").Router();
const {createOrderHandler} = require("../controllers/orderController");

router.post("/",createOrderHandler);

module.exports = router