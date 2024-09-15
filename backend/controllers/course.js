import Course from "../models/course.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch courses", error: error.message });
  }
};

export const getCourseByName = async (req, res) => {
  try {
    const course = await Course.findOne({ title: req.params.name });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch course", error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create course", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { name } = req.params;
    const updatedCourse = await Course.findOneAndUpdate(
      { title: name },
      req.body,
      { new: true }
    );
    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update course", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { name } = req.params;
    const deletedCourse = await Course.findOneAndDelete({ title: name });
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete course", error: error.message });
  }
};
