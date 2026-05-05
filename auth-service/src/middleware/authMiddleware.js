const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    try {
        const token = req.headers.authorization
        if(!token) throw new Error("Authorization header missing")
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = verifyToken