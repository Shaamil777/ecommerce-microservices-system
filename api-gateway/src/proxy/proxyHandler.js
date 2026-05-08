const axios = require("axios");

const forwardRequest = async (req, res, targetUrl) => {
  try {
    const response = await axios({
      method: req.method,
      url: targetUrl + req.originalUrl,
      data: req.body,
      headers: {
        Authorization: req.headers.authorization || "",
      },
      timeout: 5000,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || {
      success: false,
      message: "Service unavailable",
    };

    res.status(status).json(data);
  }
};

module.exports = forwardRequest;