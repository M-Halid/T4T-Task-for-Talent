import mongoose from "mongoose";

const talentProfileSchema = new mongoose.Schema({
  email: { type: String }, //required: true, unique: true
  name: { type: String },
  skills: { type: String },
  workingFields: { type: String },
  background: { type: String },
  resume: { type: String }, // You may need to handle file uploads separately
  portfolio: { type: String },
  github: { type: String },
  education: { type: String },
  certifications: { type: String },
  certificationFile: { type: String }, // You may need to handle file uploads separately
  profileImage: { data: Buffer, type: String },
  WorkDescription: { type: String },
  tags: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const TalentProfileModel = mongoose.model("TalentProfile", talentProfileSchema);

export { TalentProfileModel };
