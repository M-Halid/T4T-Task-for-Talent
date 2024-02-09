import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; // adjust the path according to your project structure

const authenticate = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization); // Log the entire Authorization header
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token:", token); // Log the extracted token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // Log the decoded JWT
    req.user = await User.findById(decoded.id);
    console.log("User:", req.user); // Log the user found in the database
    next();
  } catch (error) {
    console.log("Error in authenticate middleware:", error); // Log any error that occurs
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default authenticate;
