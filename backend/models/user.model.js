import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },

    /* ================= ROLE ================= */
    role: {
      type: String,
      enum: ["ADMIN", "DEVELOPER"],
      required: true,
    },

    /* ================= DEVELOPER DETAILS ================= */
    specializations: {
      type: [
        {
          type: String,
          enum: [
            "WEB_DEVELOPMENT",
            "APP_DEVELOPMENT",
            "FULL_STACK",
            "MARKETING",
            "CLOUD",
            "UI_UX",
          ],
        },
      ],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    currentProjectsCount: {
      type: Number,
      default: 0,
    },

    /* ================= ACCOUNT CONTROL ================= */
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    /* ================= AUDIT ================= */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

/* ================= PASSWORD HASHING ================= */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* ================= PASSWORD MATCH ================= */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
