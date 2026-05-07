const Product = require("../models/Product")
const mongoose = require('mongoose')

const createProductService = async (data)=>{
    return await Product.create(data)
};

const getProductService = async (id)=>{
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error("Invalid Product Id");
        error.statusCode = 400
        throw error
    }
    const product = await Product.findById(id)
    if(!product){
        const error = new Error("Product not found");
        error.statusCode = 404
        throw error
    }
    return product
}

module.exports = {createProductService, getProductService}