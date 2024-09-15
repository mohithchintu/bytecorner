import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
