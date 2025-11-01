import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";


// Import routes
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";

//DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes 
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/quotes", quoteRoutes);

app.get("/", (req, res)=>{
  res.send("API WORKING")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server Started on http://localhost: ${PORT}`)
);
