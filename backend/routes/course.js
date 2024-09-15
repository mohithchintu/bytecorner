import express from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", authenticate, updateCourse);
router.delete("/:id", authenticate, deleteCourse);

export default router;
