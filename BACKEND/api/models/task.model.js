import mongoose from "mongoose";

const taskProfileSchema = new mongoose.Schema({
    taskDescription:{type: String}, 
    hourlyRate: {type: Number},
    totalBidAmount: {type: Number},
    requiredSkills: {type: String},
    experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },
    clientName: {type: String},
    description: {type: String},
    website: {type: String}
  });
  
  const TaskProfileModel = mongoose.model('TaskProfile', taskProfileSchema);
  
  export { TaskProfileModel };