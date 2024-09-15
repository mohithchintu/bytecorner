import express from "express";
import { registerUser, loginUser, editUser } from "../controllers/user.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/edit/:id", authenticate, editUser);

export default router;
