import React, { useEffect, useState } from "react";
import CourseCard from "../components/course_card";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/course");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <div key={index}>
            <CourseCard
              title={course.title}
              tutor={course.tutor}
              seatsLeft={course.max_bookings - course.bookings}
              image={course.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
