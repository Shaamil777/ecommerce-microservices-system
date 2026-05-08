const express = require("express");
const router = express.Router();
const forwardRequest = require("../proxy/proxyHandler");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product catalog management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (with pagination and search)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Products per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Wireless Headphones
 *               price:
 *                 type: number
 *                 example: 49.99
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (admin only)
 */

router.use("/", (req, res) => {
  forwardRequest(req, res, "http://product-service:5002");
});

module.exports = router;