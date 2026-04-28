const router = require("express").Router()
const {createProduct, getProductById} = require("../controllers/productController")

router.post("/",createProduct)
router.get("/:id",getProductById)

module.exports = router