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
      unique: true,
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
    max_bookings: {
      type: Number,
      required: true,
    },
    bookings: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value <= this.max_bookings;
        },
        message: () => "Bookings exceeded max limit",
      },
    },
    max_waitings: {
      type: Number,
      required: true,
    },
    waitings: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value <= this.max_waitings;
        },
        message: () => "Waiting list exceeded max limit",
      },
    },
    date_slot: {
      type: String,
      required: true,
    },
    time_slot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
