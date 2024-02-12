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
  updateUserProfile,
  getUserProfile,
} from "../controllers/user.controller.js";

import {
  getTaskProfile,
  postTaskProfile,
  updateTaskProfile,
} from "../controllers/task.controller.js";
import {
  postTalentProfile,
  getTalentProfile,
  updateTalentProfile,
} from "../controllers/talent.controller.js";
import {
  getAllTalentProfiles,
  getAllTaskProfiles,
  getAllUserProfiles,
} from "../controllers/feed.controller.js";
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
router.get("/taskProfile", authenticate, getTaskProfile);
router.get("/talentProfile", authenticate, getTalentProfile);
router.post("/postTaskProfile", authenticate, postTaskProfile);
router.post("/postTalentProfile", authenticate, postTalentProfile);
router.get("/getAllTalentProfiles", authenticate, getAllTalentProfiles);
router.get("/getAllTaskProfiles", authenticate, getAllTaskProfiles);
router.get("/getAllUserProfiles", authenticate, getAllUserProfiles);

export default router;
