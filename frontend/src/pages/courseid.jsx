import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaFilePdf,
  FaVideo,
  FaUser,
  FaCalendar,
  FaClock,
  FaTag,
} from "react-icons/fa";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useUser } from "../context/userContext";

const Courseid = () => {
  const { name } = useParams();
  const { getid } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false); // For booking confirmation

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const encodedName = encodeURIComponent(name);
        const response = await fetch(
          `http://localhost:5000/api/course/${encodedName}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch course data: ${response.statusText}`
          );
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [name]);

  const handleBooking = async () => {
    const uid = getid();
    if (!uid || !course) return;

    const bookingData = {
      userId: uid,
      courseId: course.courseId,
    };

    try {
      const response = await fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        throw new Error("Failed to book the course");
      }
      setBookingSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
      setError("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{course.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                {course.demoVideo && (
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <video
                      className="w-full h-full object-cover rounded-lg"
                      controls
                    >
                      <source src={course.demoVideo} type="video/mp4" />
                    </video>
                  </div>
                )}
                {course.pdf && (
                  <a
                    href={course.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 mb-4"
                  >
                    <FaFilePdf className="mr-2" /> View Course PDF
                  </a>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Course Details
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <FaUser className="mr-2" /> Tutor: {course.tutor}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <FaVideo className="mr-2" /> Platform: {course.platform}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <FaClock className="mr-2" /> Duration: {course.duration}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <FaTag className="mr-2" /> Genre: {course.genre.join(", ")}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <FaCalendar className="mr-2" /> Date: {course.date_slot}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <FaClock className="mr-2" /> Time: {course.time_slot}
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Availability
              </h3>
              <p className="text-gray-600">
                Available Spots: {course.max_bookings - course.bookings}
              </p>
              <p className="text-gray-600">
                Waiting List Spots: {course.max_waitings - course.waitings}
              </p>
            </div>

            {bookingSuccess && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                Booking confirmed! Thank you for your reservation.
              </div>
            )}

            <button
              onClick={handleBooking}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              disabled={course.max_bookings - course.bookings <= 0} // Disable if no spots are available
            >
              {course.max_bookings - course.bookings <= 0
                ? "Fully Booked"
                : "Book Now"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courseid;
