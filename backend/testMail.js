import { sendEmail } from "./utils/sendEmail.js";

sendEmail({
  to: "yourgmail@gmail.com",
  subject: "Test Mail",
  html: "<h1>Email Working ✅</h1>",
})
.then(() => console.log("Email sent"))
.catch(console.error);
