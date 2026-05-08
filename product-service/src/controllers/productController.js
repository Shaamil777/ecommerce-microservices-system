const { createProduct, getProducts, getProductById } = require("../services/productService");

const createProductHandler = async (req, res) => {
  const product = await createProduct(req.body);
  res.status(201).json({ success: true, message: "Product created successfully", data: product });
};

const getProductsHandler = async (req, res) => {
  const result = await getProducts(req.query);
  res.status(200).json({ success: true, message: "Products fetched successfully", data: result });
};

const getProductByIdHandler = async (req, res) => {
  const product = await getProductById(req.params.id);
  res.status(200).json({ success: true, message: "Product fetched successfully", data: product });
};

module.exports = { createProductHandler, getProductsHandler, getProductByIdHandler };