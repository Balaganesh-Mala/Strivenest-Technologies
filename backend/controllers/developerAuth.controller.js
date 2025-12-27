import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* ================= DEVELOPER LOGIN ================= */
export const developerLogin = async (req, res) => {
  let { email, password } = req.body;

  // ✅ Normalize input
  email = email.trim().toLowerCase();
  password = password.trim();

  console.log("🔍 LOGIN INPUT:", email, password); // ⬅️ ADD HERE

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log("❌ USER NOT FOUND");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log("🔐 DB HASH:", user.password); // ⬅️ ADD HERE

  if (user.role !== "DEVELOPER") {
    return res.status(403).json({ message: "Not a developer account" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("✅ PASSWORD MATCH:", isMatch); // ⬅️ VERY IMPORTANT

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  user.lastLogin = new Date();
  await user.save();

  res.json({
    success: true,
    token,
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
};
