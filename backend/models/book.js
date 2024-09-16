import mongoose from "mongoose";
import { nanoid } from "nanoid";

const bookSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    userId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    bookingType: {
      type: String,
      required: true,
      enum: ["booking", "waiting"],
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookSchema);

export default Booking;
