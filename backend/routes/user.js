import express from "express";
import { registerUser, loginUser, editUser } from "../controllers/user.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/edit/:id", editUser);

export default router;
