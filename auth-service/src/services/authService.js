const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const RegisterUser = async (data) =>{
    const exisitingUser = await User.findOne({email:data.email})
    if(exisitingUser){
        const error = new Error('User Already Exists')
        error.statusCode = 409
        throw error
    }
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
    
    const accessToken = jwt.sign(
        {
            userId:user._id,
            role:user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'15m',
        }
    );

    const refreshToken = jwt.sign(
        {
            userId:user._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn:"7d",
        }
    );
    user.refreshToken = refreshToken;
    await user.save();
    return {
        accessToken,
        refreshToken,
    }
}

const RefreshAccessToken = async (refreshToken) => {

    if (!refreshToken) {

        const error =
            new Error("Refresh token required");

        error.statusCode = 401;

        throw error;
    }

    // verify refresh token
    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
    );

    // find user
    const user = await User.findById(
        decoded.userId
    );

    if (
        !user ||
        user.refreshToken !== refreshToken
    ) {

        const error =
            new Error("Invalid refresh token");

        error.statusCode = 403;

        throw error;
    }

    // create NEW access token
    const accessToken = jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m",
        }
    );

    return { accessToken };
};

const LogoutUser = async (userId)=>{
    const user = await User.findById(userId);
    if(user){
        user.refreshToken = "";
        await user.save();
    }
    return {
        message:"Logged out successfully",
    }
}

module.exports = {RegisterUser,LoginUser,RefreshAccessToken,LogoutUser}