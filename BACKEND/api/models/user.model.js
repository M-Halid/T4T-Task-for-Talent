import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  joined: { type: Date },
  age: { type: Number },
  gender: { type: String },
  location: { type: String },
  description: { type: String },
  linkedin: { type: String },
  education: { type: String },
  languages: { type: String },
  profilePicture: { type: String },
});

const User = mongoose.model("User", userSchema);

export { User };
