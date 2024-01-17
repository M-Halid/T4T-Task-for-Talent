import express from "express";
import {
  getUsers,
  signin,
  register,
  getProfile,
 
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signin", signin);
router.post("/register", register);
router.get("/profile/:id", getProfile);
export default router;
