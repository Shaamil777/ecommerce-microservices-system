const express = require("express")
const router = express.Router()
const forwardRequest = require('../proxy/proxyHandler')

router.use("/",(req,res) => {
    forwardRequest(req,res,"http://auth-service:5001")
})

module.exports = router