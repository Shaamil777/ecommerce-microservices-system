const User = require("../models/User")
const {RegisterUser,LoginUser,RefreshAccessToken,LogoutUser} = require("../services/authService")

const register = async (req,res)=>{
    const user = await RegisterUser(req.body)
    res.status(201).json(user)
}

const login = async(req,res,next)=>{
    const result = await LoginUser(req.body)
    res.json(result)
}

const refreshToken = async (req,res)=>{
    const result = await RefreshAccessToken(req.body.refreshToken)
    res.json(result)
}
const logout = async (req,res) => {
    const result = await LogoutUser(req.user.userId)
    res.json(result)
}

module.exports = {register, login, refreshToken, logout}