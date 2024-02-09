import { TalentProfileModel as TalentProfile } from "../models/talent.model.js";

export const postTalentProfile = async (req, res) => {
  const talentProfile = new TalentProfile({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const response = await talentProfile.save();
    res.status(201).json(response);
  } catch (error) {
    console.error(error); // Log the entire error object
    res.status(500).json({ message: error.message });
  }
};

export const getTalentProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const talentProfile = await TalentProfile.findOne({ userId: userId });
    if (!talentProfile) {
      res.status(204).send("No TalentProfile exists yet for this user");
    } else {
      res.json(talentProfile);
    }
  } catch (err) {
    res.status(500).send("Error occurred");
  }
};
export const updateTalentProfile = async (req, res) => {
  const updatedTalent = req.body;

  console.log("Updated talent data:", updatedTalent); // Log the updated talent data

  try {
    console.log("User ID:", req.user._id); // Log the user ID

    const talent = await TalentProfile.findOneAndUpdate(
      { userId: req.user._id },
      updatedTalent,
      { new: true, upsert: true } // add upsert option here
    );

    if (talent) {
      console.log("Updated talent:", talent); // Log the updated talent
      res.json(talent);
    } else {
      console.log("No talent found for this user"); // Log if no talent is found
    }
  } catch (error) {
    console.log("Error updating talent:", error); // Log any errors
    res.status(500).json({ message: error.message });
  }
};
