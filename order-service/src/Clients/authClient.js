const axios = require("axios");

const verifyUser = async (token) => {
  try {
    const response = await axios.get(
      "http://auth-service:5001/api/auth/verify",
      {
        headers: {
          Authorization: token,
        },
        timeout: 3000
      }
    );

    return response.data;
  } catch (error) {
    console.log("AUTH ERROR:",error.message)
    return {userId:"guest",name:"Guest User"}
  }
};

module.exports = { verifyUser };