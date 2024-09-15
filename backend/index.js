import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import bookRoutes from "./routes/book.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
