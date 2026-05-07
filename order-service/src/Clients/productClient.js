const axios = require("axios");

const getProduct = async (productId) => {
    try {

        const response = await axios.get(
            `http://product-service:5002/api/products/${productId}`,
            {
                timeout: 3000,
            }
        );

        return response.data;

    } catch (error) {

        const err = new Error(
            error.response?.data?.message ||
            "Product service unavailable"
        );

        err.statusCode =
            error.response?.status || 503;

        throw err;
    }
};

module.exports = { getProduct };