const User = require("../models/User")

const createUser = async (data) =>{
    return await User.create(data)
}

module.exports = {createUser}