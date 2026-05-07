const router = require("express").Router()
const {createProduct, getProductById} = require("../controllers/productController")
const validate = require('../middleware/validate')
const {productSchema} = require('../validators/productValidator')
const asyncHandler = require('../middleware/asyncHandler')

router.post("/",validate(productSchema),asyncHandler(createProduct))
router.get("/:id",asyncHandler(getProductById))

module.exports = router