import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const TOKEN_EXPIRES_IN = "24h";

// ✅ REGISTER ADMIN
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email }).lean();
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new Admin({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    // Generate token
    const token = jwt.sign({ id: admin._id.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      admin: { id: admin._id.toString(), name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", admin.password);

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("Password Match Result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: { id: admin._id.toString(), name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ GET ADMIN PROFILE
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    return res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error("Profile Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ DELETE ADMIN
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    await admin.deleteOne();
    return res.status(200).json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ success: false, message: "Server error while deleting admin" });
  }
};

// ✅ GET ALL ADMINS
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    return res.status(200).json({ success: true, admins });
  } catch (error) {
    console.error("Get Admins Error:", error);
    return res.status(500).json({ success: false, message: "Error fetching admins" });
  }
};

// ✅ UPDATE ADMIN PROFILE
export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;

    if (req.body.password) {
      admin.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedAdmin = await admin.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin: {
        id: updatedAdmin._id.toString(),
        name: updatedAdmin.name,
        email: updatedAdmin.email,
      },
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ success: false, message: "Error updating admin profile" });
  }
};
