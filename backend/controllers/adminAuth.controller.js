import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

/* ================= REGISTER ADMIN ================= */
export const registerAdmin = async (req, res) => {
  const { fullName, email, password, adminSecretKey } = req.body;

  if (!fullName || !email || !password || !adminSecretKey) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Verify secret key
  if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({
      message: "Invalid admin secret key",
    });
  }

  // Check existing admin
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // Create admin
  const admin = await User.create({
    fullName,
    email,
    password,
    role: "ADMIN",
    createdBy: null,
  });

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    admin: {
      id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
    },
  });
};


export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const admin = await User.findOne({ email, role: "ADMIN" }).select("+password");

  if (!admin || !admin.isActive) {
    return res.status(401).json({
      message: "Invalid admin credentials",
    });
  }

  const isMatch = await admin.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid admin credentials",
    });
  }

  admin.lastLogin = new Date();
  await admin.save();

  res.json({
    success: true,
    message: "Admin login successful",
    token: generateToken(admin),
    admin: {
      id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
    },
  });
};
