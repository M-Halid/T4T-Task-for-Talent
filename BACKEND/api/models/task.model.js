import mongoose from "mongoose";

const taskProfileSchema = new mongoose.Schema({
  taskDescription: { type: String },
  requiredSkills: { type: String },
  experienceLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Expert"],
  },
  clientName: { type: String },
  clientIndustry: { type: String },
  clientWebsite: { type: String },
  pay: { type: Number },
  clientDescription: { type: String },

  tags: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const TaskProfileModel = mongoose.model("TaskProfile", taskProfileSchema);

export { TaskProfileModel };
