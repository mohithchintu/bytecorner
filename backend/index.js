import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import bookRoutes from "./routes/book.js";
import cors from "cors";

dotenv.config();

const app = express();

app.listen(5000);
connectDB();

app.use(
  cors({
    origin: ["https://bytecorner.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/book", bookRoutes);
