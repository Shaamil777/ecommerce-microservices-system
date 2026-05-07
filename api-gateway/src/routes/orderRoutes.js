const express = require("express")
const router = express.Router()
const forwardRequest = require('../proxy/proxyHandler')

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized
 */

router.use("/",(req,res)=>{
    forwardRequest(req,res,"http://order-service:5003")
})

module.exports = router