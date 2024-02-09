import express from "express";
import {
  getUsers,
  signin,
  register,
  getProfile,
  newProfileTalent,
  newProfileTask,
  updateTalent,
  updateProfile,
  deleteProfile,
  updateTalentProfile,
  updateTaskProfile,
  updateUserProfile,
  getUserProfile,
} from "../controllers/user.controller.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signin", signin);
router.post("/register", register);
router.get("/profile/:id", authenticate, getProfile);
router.post("/submitTalent", authenticate, newProfileTalent);
router.put("/updateTalent", authenticate, updateTalent);
router.post("/submitTask", authenticate, newProfileTask);
router.put("/profile/:id", authenticate, updateProfile);
router.put("/updateUserProfile", authenticate, updateUserProfile);
router.put("/updateTalentProfile", authenticate, updateTalentProfile);
router.put("/updateTaskProfile", authenticate, updateTaskProfile);
router.get("/userProfile", authenticate, getUserProfile);
router.delete("/profile/:id", authenticate, deleteProfile);

export default router;
