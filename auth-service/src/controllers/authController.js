const User = require("../models/User")
const {RegisterUser,LoginUser} = require("../services/authService")

const register = async (req,res)=>{
    const user = await RegisterUser(req.body)
    res.status(201).json(user)
}

const login = async(req,res,next)=>{
    const result = await LoginUser(req.body)
    res.json(result)
}

module.exports = {register, login}