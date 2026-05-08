const axios = require("axios");

const verifyUser = async (token) => {
  try {
    const response = await axios.get(
      "http://auth-service:5001/api/auth/verify",
      {
        headers: { Authorization: token },
        timeout: 3000,
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Auth verification failed:", error.message);
    return null;
  }
};

module.exports = { verifyUser };
