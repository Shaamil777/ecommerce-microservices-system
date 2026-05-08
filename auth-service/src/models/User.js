const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum:["admin", "user"],
        default:"user"
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    refreshToken:{
        type:String,
        default:""
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);