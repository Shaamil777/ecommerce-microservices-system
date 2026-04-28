const Product = require("../models/Product")

const createProductService = async (data)=>{
    return await Product.create(data)
};

const getProductService = async (id)=>{
    return await Product.findById(id)
}

module.exports = {createProductService, getProductService}