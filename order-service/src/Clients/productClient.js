const axios = require("axios");

const getProduct = async (productId) => {
  try {
    const response = await axios.get(
      `http://product-service:5002/api/products/${productId}`,
      {
        timeout:3000
      }
    );

    return response.data;
  } catch (error) {
    console.log("PRODUCT ERROR:", error.message);

    if (retries > 0) {
      console.log("Retrying product fetch...");
      return getProduct(productId, retries - 1);
    }

    throw new Error("Product service unavailable");
  }
};

module.exports = { getProduct };