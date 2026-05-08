const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  const { password, refreshToken, ...userData } = user.toObject();
  return userData;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token required");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 403;
    throw error;
  }

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  return { accessToken };
};

const logoutUser = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    user.refreshToken = "";
    await user.save();
  }
};

module.exports = { registerUser, loginUser, refreshAccessToken, logoutUser };