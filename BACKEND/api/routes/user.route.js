import express from "express";
import {
  getUsers,
  signin,
  register,
  getProfile,
  newProfileTalent,
  newProfileTask,
  updateTalent
 
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signin", signin);
router.post("/register", register);
router.get("/profile/:id", getProfile);
router.post("/submitTalent", newProfileTalent);
router.put("/updateTalent", updateTalent);
router.post("/submitTask", newProfileTask);
export default router;
