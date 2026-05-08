const router = require("express").Router();
const { createProductHandler, getProductsHandler, getProductByIdHandler } = require("../controllers/productController");
const validate = require("../middleware/validate");
const { productSchema } = require("../validators/productValidator");
const asyncHandler = require("../middleware/asyncHandler");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.get("/", asyncHandler(getProductsHandler));
router.get("/:id", asyncHandler(getProductByIdHandler));
router.post("/", verifyToken, authorizeRoles("admin"), validate(productSchema), asyncHandler(createProductHandler));

module.exports = router;