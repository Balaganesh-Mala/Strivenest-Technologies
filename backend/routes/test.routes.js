import express from "express";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "yourgmail@gmail.com",
      subject: "Test Email ✅",
      html: "<h1>Email system is working 🎉</h1>",
    });

    res.send("✅ Email sent");
  } catch (err) {
    res.status(500).send("❌ Email failed");
  }
});

export default router;
