const router = require("express").Router()
const {createProduct, getProducts, getProductById} = require("../controllers/productController")
const validate = require('../middleware/validate')
const {productSchema} = require('../validators/productValidator')
const asyncHandler = require('../middleware/asyncHandler')
const verifyToken = require("../middleware/authMiddleware")
const authorizeRoles = require("../middleware/roleMiddleware")

router.get('/',asyncHandler(getProducts))
router.post("/",verifyToken,authorizeRoles('admin'),validate(productSchema),asyncHandler(createProduct))
router.get("/:id",asyncHandler(getProductById))

module.exports = router