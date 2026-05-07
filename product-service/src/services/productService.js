const Product = require("../models/Product")
const mongoose = require('mongoose')

const createProductService = async (data)=>{
    return await Product.create(data)
};

const getProductsService = async (query) =>{
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5
    const skip = (page-1)*limit

    const search = query.search || "";
    const filter = {
        name:{
            $regex:search,
            $options:"i",
        },
    };
    const total = await Product.countDocuments(filter)
    const products = await Product.find(filter).skip(skip).limit(limit);
    return {
        total,
        page,
        limit,
        products,
    }
}

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

module.exports = {createProductService, getProductsService, getProductService}