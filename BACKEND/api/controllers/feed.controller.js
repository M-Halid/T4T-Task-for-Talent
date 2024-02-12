import { TalentProfileModel as TalentProfile } from "../models/talent.model.js";
import { TaskProfileModel as TaskProfile } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const getAllTalentProfiles = async (req, res) => {
  console.log("Getting all talent profiles...");
  try {
    const talentProfile = await TalentProfile.find();
    console.log(`Found ${talentProfile.length} talent profiles.`);
    if (!talentProfile || talentProfile.length === 0) {
      console.log("No TalentProfiles exist");
      res.status(204).send("No TalentProfiles exist");
    } else {
      res.json(talentProfile);
    }
  } catch (err) {
    console.error("Error getting talent profiles: ", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getAllTaskProfiles = async (req, res) => {
  console.log("Getting all task profiles...");
  try {
    const taskProfile = await TaskProfile.find();
    if (!taskProfile || taskProfile.length === 0) {
      console.log("No TaskProfiles exist");
      res.status(204).send("No TaskProfiles exist");
    } else {
      console.log(`Found ${taskProfile.length} task profiles.`);
      res.json(taskProfile);
    }
  } catch (err) {
    console.error("Error getting task profiles: ", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getAllUserProfiles = async (req, res) => {
  console.log("Getting all user profiles...");
  try {
    const userProfiles = await User.find();
    console.log(`Found ${userProfiles.length} user profiles.`);
    if (!userProfiles || userProfiles.length === 0) {
      console.log("No UserProfiles exist");
      res.status(204).send("No UserProfiles exist");
    } else {
      res.json(userProfiles);
    }
  } catch (err) {
    console.error("Error getting user profiles: ", err.message);
    res.status(500).json({ error: err.message });
  }
};
