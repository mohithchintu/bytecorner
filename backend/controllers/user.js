import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  const { username, email, mobile, password, genre } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      mobile,
      password: hashedPassword,
      genre,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User registration failed", error: err });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed", error: err });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const { email, mobile, password, genre } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use." });
      }
      user.email = email;
    }

    if (mobile) user.mobile = mobile;
    if (genre) user.genre = genre;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User update failed", error: err });
  }
};
