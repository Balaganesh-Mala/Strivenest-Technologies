import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const mailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

mailTransporter.verify((err) => {
  if (err) {
    console.error("❌ Brevo Email Error:", err);
  } else {
    console.log("✅ Brevo Email Ready");
  }
});
