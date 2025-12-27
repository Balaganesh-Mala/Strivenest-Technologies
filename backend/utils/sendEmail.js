import { mailTransporter } from "../config/email.config.js";

export const sendEmail = async ({ to, subject, html }) => {
  await mailTransporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};
