import mongoose from "mongoose";
import { nanoid } from "nanoid";

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      default: () => nanoid(6),
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    tutor: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    demoVideo: {
      type: String,
    },
    pdf: {
      type: String,
    },
    genre: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
