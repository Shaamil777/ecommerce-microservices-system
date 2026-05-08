const router = require("express").Router()
const {register, login, refreshToken, logout} = require("../controllers/authController")
const verifyToken = require("../middleware/authMiddleware")
const validate = require("../middleware/validate")
const {registerSchema,loginSchema} = require("../validators/authValidator")
const asyncHandler = require('../middleware/asyncHandler')

router.post("/register",validate(registerSchema),asyncHandler(register))
router.post("/login",validate(loginSchema),asyncHandler(login))
router.get("/verify",verifyToken,(req,res)=>{
    res.json({userId:req.user.id})
})
router.post('/refresh',asyncHandler(refreshToken))

router.post(
    "/logout",
    verifyToken,
    asyncHandler(logout)
);

module.exports = router