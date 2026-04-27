const router = require("express").Router()

router.post("/register",(req,res)=>{
    res.json({message:"User registered"})
})

router.get("/verify", (req, res) => {
  res.json({ userId: "123", name: "Test User" });
});

module.exports = router