import express from "express";
import { createBooking, cancelBooking } from "../controllers/book.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createBooking);
router.delete("/cancel/:id", authenticate, cancelBooking);

export default router;
