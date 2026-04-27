const {verifyUser} = require("../Clients/authClient");
const {getProduct} = require("../Clients/productClient");

const createOrder = async (req)=>{
        const token = req.headers.authorization;
        const {productId} = req.body

        console.log("step 1: verifying User")
        const user = await verifyUser(token)

        console.log("step 2: getting Product")
        let product;
        try {
            product = await getProduct(productId)
        } catch (error) {
            console.log("Product failed, using fallback")
            product = {id:productId,name:"Unknown Product"}
        }

        return {
            message:"Order created successfully",
            user,
            product
        }
};

module.exports = {createOrder};
