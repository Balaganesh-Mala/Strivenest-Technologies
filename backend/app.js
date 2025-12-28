import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import developerRoutes from "./routes/developer.routes.js";
import clientRequestRoutes from "./routes/clientRequest.routes.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import developerAuthRoutes from "./routes/developerAuth.routes.js";
import testRoutes from "./routes/test.routes.js";
import blogRoutes from "./routes/blog.routes.js";



const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/* ================= ROUTES ================= */

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// Auth
app.use("/api/auth", authRoutes);

// Public client request
app.use("/api/client", clientRequestRoutes);

// Admin
app.use("/api/admin", adminRoutes);
app.use("/api/admin-auth", adminAuthRoutes);
app.use("/api/projects", projectRoutes);


// Developer
app.use("/api/developer", developerRoutes);
app.use("/api/developer-auth", developerAuthRoutes);

app.use("/", testRoutes);
app.use("/api/blogs", blogRoutes);

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;
