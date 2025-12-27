import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.isActive) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  user.lastLogin = new Date();
  await user.save();

  res.json({
    success: true,
    token: generateToken(user),
    user: {
      id: user._id,
      fullName: user.fullName,
      role: user.role,
      specializations: user.specializations,
    },
  });
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "If email exists, reset link sent" });
  }

  // 🔐 Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

  await user.save();

  const resetUrl =
  `${process.env.CLIENT_URL}/developer/reset-password/${resetToken}`;



  await sendEmail({
  to: user.email,
  subject: "Reset Your Password – Strivenest Technologies",
  html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:30px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

      <!-- HEADER -->
      <div style="background:#4f46e5; padding:20px; text-align:center;">
        <h1 style="color:#ffffff; margin:0; font-size:22px;">
          Strivenest Technologies
        </h1>
        <p style="color:#e0e7ff; margin:5px 0 0; font-size:13px;">
          Anantapur
        </p>
      </div>

      <!-- BODY -->
      <div style="padding:30px;">
        <h2 style="color:#111827; font-size:20px; margin-bottom:10px;">
          Reset Your Password
        </h2>

        <p style="color:#374151; font-size:14px; line-height:1.6;">
          Hello <strong>${user.fullName || "there"}</strong>,
        </p>

        <p style="color:#374151; font-size:14px; line-height:1.6;">
          We received a request to reset your password for your developer account at
          <strong>Strivenest Technologies</strong>.
        </p>

        <p style="color:#374151; font-size:14px; line-height:1.6;">
          Click the button below to securely reset your password. This link is valid
          for <strong>15 minutes</strong>.
        </p>

        <!-- BUTTON -->
        <div style="text-align:center; margin:30px 0;">
          <a href="${resetUrl}"
            style="
              background:#4f46e5;
              color:#ffffff;
              padding:12px 24px;
              border-radius:6px;
              text-decoration:none;
              font-size:14px;
              font-weight:600;
              display:inline-block;
            ">
            Reset Password
          </a>
        </div>

        <p style="color:#6b7280; font-size:13px; line-height:1.6;">
          If you did not request a password reset, please ignore this email.
          Your account remains secure.
        </p>

        <p style="color:#6b7280; font-size:13px; line-height:1.6;">
          For security reasons, never share this link with anyone.
        </p>

        <!-- FOOTER -->
        <hr style="border:none; border-top:1px solid #e5e7eb; margin:30px 0;" />

        <p style="color:#9ca3af; font-size:12px; text-align:center;">
          © ${new Date().getFullYear()} Strivenest Technologies, Anantapur<br/>
          This is an automated email. Please do not reply.
        </p>
      </div>
    </div>
  </div>
  `,
});


  res.json({ message: "Reset link sent to email" });
};


export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = password; // ✅ RAW password (model will hash)
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  res.json({ message: "Password reset successful" });
};
