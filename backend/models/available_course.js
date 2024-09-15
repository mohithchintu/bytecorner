import mongoose from "mongoose";

const available_courseScheme = new mongoose.Schema(
  {
    course_id: {
      type: String,
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
  {
    timestamps: true,
  }
);

const Available_course = mongoose.model(
  "Available_course",
  available_courseScheme
);

export default Available_course;
