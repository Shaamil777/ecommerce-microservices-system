const {createProductService, getProductService} = require("../services/productService")

const createProduct = async (req,res)=>{
    try {
        const product = await createProductService(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getProductById = async (req,res)=>{
    try {
        const product = await getProductService(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({message:"Product Not Found"})
    }
}

module.exports = {createProduct, getProductById}