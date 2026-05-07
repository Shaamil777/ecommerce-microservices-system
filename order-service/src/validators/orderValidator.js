const { z } = require("zod");

const orderSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
});

module.exports = {
    orderSchema,
};