import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  entries: Number,
  joined: Date,
});

const User = mongoose.model("User", userSchema);

export { User };
