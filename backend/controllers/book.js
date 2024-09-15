import Booking from "../models/book.js";
import AvailableCourse from "../models/available_course.js";

export const createBooking = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const availableCourse = await AvailableCourse.findOne({
      course_id: courseId,
    });

    if (!availableCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (availableCourse.bookings >= availableCourse.max_bookings) {
      if (availableCourse.waitings >= availableCourse.max_waitings) {
        return res
          .status(400)
          .json({ message: "Both bookings and waiting list are full" });
      }

      const newBooking = new Booking({
        userId,
        courseId,
        bookingType: "waiting",
      });

      availableCourse.waitings += 1;
      await availableCourse.save();

      const savedBooking = await newBooking.save();
      return res
        .status(201)
        .json({ message: "Added to waiting list", booking: savedBooking });
    }

    const newBooking = new Booking({
      userId,
      courseId,
      bookingType: "booking",
    });

    availableCourse.bookings += 1;
    await availableCourse.save();

    const savedBooking = await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking successful", booking: savedBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const availableCourse = await AvailableCourse.findOne({
      course_id: booking.courseId,
    });
    if (!availableCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (booking.bookingType === "booking") {
      availableCourse.bookings -= 1;

      const nextWaitingBooking = await Booking.findOne({
        courseId: booking.courseId,
        bookingType: "waiting",
      }).sort({ createdAt: 1 });

      if (nextWaitingBooking) {
        nextWaitingBooking.bookingType = "booking";
        await nextWaitingBooking.save();
        availableCourse.waitings -= 1;
        availableCourse.bookings += 1;
      }
    } else if (booking.bookingType === "waiting") {
      availableCourse.waitings -= 1;
    }
    await availableCourse.save();
    await booking.remove();

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error canceling booking", error: error.message });
  }
};
