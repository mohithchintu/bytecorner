import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { useToast } from "../hooks/Toast";

const Courseid = () => {
  const { name } = useParams();
  const { getid, isAuthenticated } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const showToast = useToast();
  const navigate = useNavigate();

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
        showToast("error", `Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [name, showToast]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      showToast("warning", "Please register to continue");
      navigate("/register");
      return;
    }

    const uid = getid();
    if (!uid || !course) return;

    const availableSpots = course.max_bookings - course.bookings;
    const waitingListSpots = course.max_waitings - course.waitings;

    const bookingData = {
      userId: uid,
      courseId: course.courseId,
    };

    try {
      if (availableSpots > 0) {
        const response = await fetch("http://localhost:5000/api/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to book the course");
        }

        const responseData = await response.json();
        setIsBooked(true);
        showToast("success", responseData.message);
      } else if (waitingListSpots > 0) {
        const response = await fetch("http://localhost:5000/api/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add to waiting list");
        }

        const responseData = await response.json();
        showToast("normal", responseData.message);
      } else {
        showToast("error", "No spots available and waiting list is full.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      showToast("error", error.message || "Booking failed. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );

  if (!course) return null;

  const availableSpots = course.max_bookings - course.bookings;
  const waitingListSpots = course.max_waitings - course.waitings;

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
                    <FaCalendar className="mr-2" /> Start Date:{" "}
                    {course.startDate}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <FaClock className="mr-2" /> Duration: {course.duration}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <FaTag className="mr-2" /> Available Spots:{" "}
                    {availableSpots > 0 ? availableSpots : "None"}
                  </li>
                  <li className="flex items-center text-gray-600">
                    <FaTag className="mr-2" /> Waiting List Spots:{" "}
                    {waitingListSpots > 0 ? waitingListSpots : "None"}
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              {availableSpots > 0
                ? "Book Now"
                : waitingListSpots > 0
                ? "Join Waiting List"
                : "Fully Booked"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courseid;
