import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

export const createDeveloper = async (req, res) => {
  const { fullName, email, specializations } = req.body;

  if (!fullName || !email || !specializations?.length) {
    return res.status(400).json({
      message: "Full name, email and specializations are required",
    });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({
      message: "Developer already exists",
    });
  }

  // 🔐 Generate temporary password
  const tempPassword = Math.random().toString(36).slice(-8);
  

  // 👤 Create developer
  await User.create({
    fullName,
    email,
    password: tempPassword,
    role: "DEVELOPER",
    specializations,
    isActive: true,
    isAvailable: true,
    currentProjectsCount: 0,
    createdBy: req.user._id,
  });

// 📧 Send email
try {
  const loginUrl = `${process.env.CLIENT_URL}/developer/login`;

  console.log("📨 Sending email to:", email);

  await sendEmail({
    to: email,
    subject: "Welcome to Strivenest Technologies – Developer Access",
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
            Welcome to the Team 👋
          </h2>

          <p style="color:#374151; font-size:14px; line-height:1.6;">
            Hello <strong>${email}</strong>,
          </p>

          <p style="color:#374151; font-size:14px; line-height:1.6;">
            Your developer account has been successfully created at
            <strong>Strivenest Technologies</strong>.
          </p>

          <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:6px; padding:15px; margin:20px 0;">
            <p style="margin:0; font-size:14px;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="margin:8px 0 0; font-size:14px;">
              <strong>Temporary Password:</strong>
              <span style="font-family:monospace; background:#ffffff; padding:4px 8px; border-radius:4px; border:1px solid #e5e7eb;">
                ${tempPassword}
              </span>
            </p>
          </div>

          <p style="color:#b91c1c; font-size:13px;">
            ⚠️ For security reasons, please log in and change your password immediately.
          </p>

          <!-- LOGIN BUTTON -->
          <div style="text-align:center; margin:30px 0;">
            <a href="${loginUrl}"
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
              Login to Developer Portal
            </a>
          </div>

          <p style="color:#6b7280; font-size:13px; line-height:1.6;">
            If you believe this account was created by mistake, please contact our support team immediately.
          </p>

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

  console.log("✅ Email sent successfully");
} catch (err) {
  console.error("❌ Email sending failed:", err.message);
}



  // ✅ Return credentials ONCE to admin UI
  res.status(201).json({
    success: true,
    message: "Developer created successfully",
    credentials: {
      email,
      password: tempPassword,
    },
  });
};



/* ================= GET ALL DEVELOPERS ================= */
export const getAllDevelopers = async (req, res) => {
  const developers = await User.find({ role: "DEVELOPER" }).select(
    "-password"
  );

  res.json({
    success: true,
    developers,
  });
};

/* ================= ENABLE / DISABLE DEVELOPER ================= */
export const updateDeveloperStatus = async (req, res) => {
  const { isActive } = req.body;

  const developer = await User.findByIdAndUpdate(
    req.params.id,
    { isActive },
    { new: true }
  );

  if (!developer) {
    return res.status(404).json({
      message: "Developer not found",
    });
  }

  res.json({
    success: true,
    message: "Developer status updated",
  });
};
