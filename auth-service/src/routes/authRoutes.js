const router = require("express").Router()
const {register, login} = require("../controllers/authController")
const verifyToken = require("../middleware/authMiddleware")

router.post("/register",register)
router.post("/login",login)
router.get("/verify",verifyToken,(req,res)=>{
    res.json({userId:req.user.id})
})

module.exports = router