const User = require("../models/User")
const {createUser} = require("../services/authService")

const registerUser = async (req,res)=>{
    try {
        const user = await createUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const verifyUser = (req,res)=>{
    res.json({userId:"123",name:"Test User"})
}

module.exports = {registerUser, verifyUser}