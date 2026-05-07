const router = require("express").Router()
const {createProduct, getProductById} = require("../controllers/productController")
const validate = require('../middleware/validate')
const {productSchema} = require('../validators/productValidator')

router.post("/",validate(productSchema),createProduct)
router.get("/:id",getProductById)

module.exports = router