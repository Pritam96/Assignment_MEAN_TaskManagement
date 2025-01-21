import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized request: No token provided" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken?.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthorized request: Invalid token" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unauthorized request: Invalid access token",
    });
  }
};

export default protect;
