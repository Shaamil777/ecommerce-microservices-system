const axios = require("axios")

const forwardRequest = async (req,res,targetUrl) => {
    try {
        console.log("Forwarding to:", targetUrl + req.originalUrl);
        const response = await axios({
            method:req.method,
            url:targetUrl + req.originalUrl,
            data:req.body,
            headers:{
                Authorization: req.headers.authorization || "",
            },
            timeout:5000
        })

        res.status(response.status).json(response.data)
    } catch (error) {
        res.status(500).json({
            message:"Error forwarding request",
            error:error.message
        })
    }
}

module.exports = forwardRequest