import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.create({ name, email, password });
    await generateTokenResponse(res, user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email }).select(
      "+password"
    );

    if (!existingUser || !(await existingUser.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    await generateTokenResponse(res, existingUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const generateTokenResponse = async (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  return res.status(200).cookie("accessToken", token, options).json({
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    accessToken: token,
  });
};

export { registerUser, loginUser };
