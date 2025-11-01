import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const TOKEN_EXPIRES_IN = "24h";

// REGISTER ADMIN
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await Admin.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

    return res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("Password Match Result:", isMatch);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get Profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json(admin);
  } catch (error) {
    console.error("Profile Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await admin.deleteOne();
    return res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Server error while deleting admin" });
  }
};

// ✅ Get All Admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    return res.json(admins);
  } catch (error) {
    console.error("Get Admins Error:", error);
    return res.status(500).json({ message: "Error fetching admins" });
  }
};

// ✅ Update Admin
export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;

    if (req.body.password) {
      admin.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedAdmin = await admin.save();

    return res.status(200).json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ message: "Error updating admin profile" });
  }
};
