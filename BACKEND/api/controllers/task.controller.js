import { TaskProfileModel as TaskProfile } from "../models/task.model.js";

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
