const {createProductService, getProductService} = require("../services/productService")

const createProduct = async (req,res)=>{
    const product = await createProductService(req.body)
    res.status(201).json(product)
}

const getProductById = async (req,res)=>{
    const product = await getProductService(req.params.id)
    res.status(200).json(product)
}

module.exports = {createProduct, getProductById}