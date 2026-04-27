const express = require("express")
const router = express.Router()
const forwardRequest = require('../proxy/proxyHandler')

router.use("/",(req,res)=>{
    forwardRequest(req,res,"http://product-service:5002")
})

module.exports = router