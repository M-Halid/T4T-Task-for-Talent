import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { TalentProfileModel as TalentProfile } from "../models/talent.model.js";
import { TaskProfileModel as TaskProfile } from "../models/task.model.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const signin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Bad Request: Missing email or password");
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json("Error comparing passwords");
        }

        if (result) {
          const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            entries: user.entries,
            joined: user.joined,
          };

          // Create JWT payload
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            // Add more user properties here if needed
          };

          // Sign the payload and create the token
          const secret = process.env.JWT_SECRET;
          const options = { expiresIn: "1h" };
          const token = jwt.sign(payload, secret, options);

          res.json({
            user: userResponse,
            token, // Include the token in the response
          });
        } else {
          res.status(400).json("Incorrect password");
        }
      });
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json("User with the same email already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      joined: new Date(),
    });
    const newUser = await user.save();

    // Call signin after registering the user
    console.log(email, password);
    await signin({ body: { email: email, password: password } }, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const newProfileTalent = async (req, res) => {
  try {
    const talentProfile = new TalentProfileModel({
      ...req.body,
      userId: req.user._id,
    });
    await talentProfile.save();
    res.status(201).json({ message: "Talent profile submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const newProfileTask = async (req, res) => {
  try {
    const taskProfile = new TaskProfileModel({
      ...req.body,
      userId: req.user._id,
    });
    await taskProfile.save();
    res.status(201).json({ message: "Task profile submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTalent = async (req, res) => {
  const { email, updatedProfile } = req.body;
  try {
    const existingTalent = await TalentProfileModel.findOne({
      email,
      userId: req.user._id,
    });
    if (!existingTalent) {
      const talentProfile = new TalentProfileModel({
        ...updatedProfile,
        userId: req.user._id,
      });
      await talentProfile.save();
      res
        .status(201)
        .json({ message: "Talent profile submitted successfully!" });
    } else {
      existingTalent.set(updatedProfile);
      await existingTalent.save();
      res.json({ message: "Talent profile updated successfully" });
    }
  } catch (error) {
    console.error("Error updating talent profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  const { email, updatedProfile } = req.body;
  try {
    const existingTask = await TaskProfileModel.findOne({
      email,
      userId: req.user._id,
    });
    if (!existingTask) {
      const taskProfile = new TaskProfileModel({
        ...updatedProfile,
        userId: req.user._id,
      });
      await taskProfile.save();
      res.status(201).json({ message: "Task profile submitted successfully!" });
    } else {
      existingTask.set(updatedProfile);
      await existingTask.save();
      res.json({ message: "Task profile updated successfully" });
    }
  } catch (error) {
    console.error("Error updating task profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json("No such user");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json("No such user");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json("No such user");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const updatedUser = req.body;

  console.log("Updated user data:", updatedUser); // Log the updated user data

  try {
    console.log("User ID:", req.user._id); // Log the user ID

    const user = await User.findByIdAndUpdate(req.user._id, updatedUser, {
      new: true,
    });

    if (user) {
      console.log("Updated user:", user); // Log the updated user
      res.json(user);
    } else {
      console.log("No user found with this ID"); // Log if no user is found
    }
  } catch (error) {
    console.log("Error updating user:", error); // Log any errors
    res.status(500).json({ message: error.message });
  }
};

export const updateTalentProfile = async (req, res) => {
  const updatedTalent = req.body;

  try {
    const talent = await TalentProfileModel.findOneAndUpdate(
      { userId: req.user._id },
      updatedTalent,
      { new: true }
    );

    if (talent) {
      res.json(talent);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskProfile = async (req, res) => {
  const updatedTask = req.body;

  console.log("Updated task data:", updatedTask); // Log the updated task data

  try {
    console.log("User ID:", req.user._id); // Log the user ID

    const task = await TaskProfile.findOneAndUpdate(
      { userId: req.user._id },
      updatedTask,
      { new: true, upsert: true } // add upsert option here
    );

    if (task) {
      console.log("Updated task:", task); // Log the updated task
      res.json(task);
    } else {
      console.log("No task found for this user"); // Log if no task is found
    }
  } catch (error) {
    console.log("Error updating task:", error); // Log any errors
    res.status(500).json({ message: error.message });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json("No such user");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const taskProfile = await TaskProfile.findOne({ userId: userId });
    if (!taskProfile) {
      res.status(204).send("No TaskProfile exists yet for this user");
    } else {
      res.json(taskProfile);
    }
  } catch (err) {
    res.status(500).send("Error occurred");
  }
};

export const getTalentProfile = async (req, res) => {
  try {
    const talent = await TalentProfileModel.findOne({ userId: req.user._id });
    if (talent) {
      res.json(talent);
    } else {
      res.status(404).json("No talent profile found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const postTaskProfile = async (req, res) => {
  const taskProfile = new TaskProfile({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const response = await taskProfile.save();
    res.status(201).json(response);
  } catch (error) {
    console.error(error); // Log the entire error object
    res.status(500).json({ message: error.message });
  }
};

export const postTalentProfile = async (req, res) => {
  const talentProfile = new TalentProfileModel({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const response = await talentProfile.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
