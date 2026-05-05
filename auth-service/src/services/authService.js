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
    if(!user) throw new Error("User not found")
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) throw new Error("Invalid credentials")
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
    return {token}
}

module.exports = {RegisterUser,LoginUser}