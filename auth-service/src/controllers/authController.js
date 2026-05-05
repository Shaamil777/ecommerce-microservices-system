const User = require("../models/User")
const {RegisterUser,LoginUser} = require("../services/authService")

const register = async (req,res)=>{
    try {
        const user = await RegisterUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const login = async(req,res)=>{
    try {
        const result = await LoginUser(req.body)
        res.json(result)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {register, login}