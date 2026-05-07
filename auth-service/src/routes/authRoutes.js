const router = require("express").Router()
const {register, login} = require("../controllers/authController")
const verifyToken = require("../middleware/authMiddleware")
const validate = require("../middleware/validate")
const {registerSchema,loginSchema} = require("../validators/authValidator")

router.post("/register",validate(registerSchema),register)
router.post("/login",validate(loginSchema),login)
router.get("/verify",verifyToken,(req,res)=>{
    res.json({userId:req.user.id})
})

module.exports = router