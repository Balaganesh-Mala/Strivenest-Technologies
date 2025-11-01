import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    req.admin = admin
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
