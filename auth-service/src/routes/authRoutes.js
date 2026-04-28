const router = require("express").Router()
const {registerUser, verifyUser} = require("../controllers/authController")

router.post("/register",registerUser)
router.get("/verify",verifyUser)

module.exports = router