const { registerUser, loginUser, refreshAccessToken, logoutUser } = require("../services/authService");

const register = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({ success: true, message: "User registered successfully", data: user });
};

const login = async (req, res) => {
  const tokens = await loginUser(req.body);
  res.status(200).json({ success: true, message: "Login successful", data: tokens });
};

const refreshToken = async (req, res) => {
  const result = await refreshAccessToken(req.body.refreshToken);
  res.status(200).json({ success: true, message: "Token refreshed successfully", data: result });
};

const logout = async (req, res) => {
  await logoutUser(req.user.userId);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = { register, login, refreshToken, logout };