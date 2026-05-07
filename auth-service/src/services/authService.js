const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const RegisterUser = async (data) =>{
    const hashedPassword = await bcrypt.hash(data.password,10)
    const user = await User.create({
        ...data,
        password:hashedPassword
    })
    
    return user
}

const LoginUser = async({email,password})=>{
    const user = await User.findOne({email})
    if(!user) {
        const error = new Error("User Not Found")
        error.statusCode = 404
        throw error
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        const error = new Error("Credentails Doesn't Match")
        error.statusCode = 401
        throw error
    }
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
    return {token}
}

module.exports = {RegisterUser,LoginUser}