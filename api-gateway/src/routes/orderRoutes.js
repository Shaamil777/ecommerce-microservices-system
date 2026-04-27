const express = require("express")
const router = express.Router()
const forwardRequest = require('../proxy/proxyHandler')

router.use("/",(req,res)=>{
    forwardRequest(req,res,"http://order-service:5003")
})

module.exports = router