const router = require("express").Router()

router.post("/",(req,res)=>{
    res.json({message:"Product working"})
})

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Sample Product" });
}); 

module.exports = router