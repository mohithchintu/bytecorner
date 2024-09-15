import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/avaliable_course.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/courses", authenticate, createCourse);
router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);
router.put("/courses/:id", authenticate, updateCourse);
router.delete("/courses/:id", authenticate, deleteCourse);

export default router;
