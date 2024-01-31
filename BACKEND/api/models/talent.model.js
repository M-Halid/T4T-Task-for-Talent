import mongoose from "mongoose";

const talentProfileSchema = new mongoose.Schema({
  email: { type: String  },   //required: true, unique: true
  name: { type: String,  },
  skills: { type: String,  },
  workingFields: { type: String,  },
  age: { type: Number,  min: 18 },
  gender: { type: String, enum: ['male', 'female', 'diverse'] },
  location: { type: String,  },
  background: { type: String,  },
  resume: { type: String }, // You may need to handle file uploads separately
  portfolio: { type: String },
  github: { type: String },
  linkedin: { type: String },
  education: { type: String },
  certifications: { type: String },
  certificationFile: { type: String }, // You may need to handle file uploads separately
  languages: { type: String },
  });

const TalentProfileModel = mongoose.model('TalentProfile', talentProfileSchema);

export { TalentProfileModel };