import express from "express";
import {
  getUsers,
  signin,
  register,
  getProfile,
  updateProfileTalent,
  updateProfileTask
 
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signin", signin);
router.post("/register", register);
router.get("/profile/:id", getProfile);
router.post("/submitTalent", updateProfileTalent);
router.post("/submitTask", updateProfileTask);
export default router;
