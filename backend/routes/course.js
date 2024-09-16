import express from "express";
import {
  getCourses,
  getCourseByName,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:name", getCourseByName);
router.post("/", createCourse);
router.put("/:name", updateCourse);
router.delete("/:name", authenticate, deleteCourse);

export default router;
