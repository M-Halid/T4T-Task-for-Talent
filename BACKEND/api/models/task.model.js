import mongoose from "mongoose";

const taskProfileSchema = new mongoose.Schema({
  taskDescription: { type: String },
  requiredSkills: { type: String },
  experienceLevel: {
    type: String,
  },
  clientName: { type: String },
  clientIndustry: { type: String },
  clientWebsite: { type: String },
  pay: { type: String },
  clientDescription: { type: String },

  tags: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const TaskProfileModel = mongoose.model("TaskProfile", taskProfileSchema);

export { TaskProfileModel };
