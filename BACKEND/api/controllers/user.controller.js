      import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import {TalentProfileModel} from "../models/talent.model.js";
import {TaskProfileModel} from "../models/task.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  console.log(req.body); // Log the request body

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Bad Request: Missing email or password");
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log(err); // Log any bcrypt errors
          return res.status(500).json("Error comparing passwords");
        }
        if (result) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            entries: user.entries,
            joined: user.joined,
          });
        } else {
          res.status(400).json("Incorrect password");
        }
      });
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.log(error); // Log any other errors
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      entries: 0,
      joined: new Date(),
    });
    const newUser = await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfileTalent = async (req, res) => {
  // Handle form submission
    try {
      const talentProfile = new TalentProfileModel(req.body);
      await talentProfile.save();
      console.log(talentProfile);
      res.status(201).json({ message: 'Talent profile submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProfileTask = async (req, res) => {
  // Handle form submission
    try {
      const taskProfile = new TaskProfileModel(req.body);
      await taskProfile.save();
      console.log(taskProfile);
      res.status(201).json({ message: 'Task profile submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
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








  /*try {
    const user = await User.findById(id);
    console.log("User:", user); // Log the user object

    if (user) {
      user.entries++;
      console.log("User after incrementing entries:", user); // Log the user object after incrementing entries

      await user.save();

      // Call the Clarifai API and calculate the face locations
      let data;
      try {
        data = await callClarifaiApi(imageUrl);
      } catch (error) {
        console.log("Error calling Clarifai API:", error); // Log the error from the Clarifai API call
        return res
          .status(500)
          .json({ message: "Error calling Clarifai API: " + error.message });
      }

      const faceLocations = calculateFaceLocation(data);

      // Return the updated entries count and the face locations
      res.json({ entries: user.entries, faceLocations });
    } else {
      console.log("User not found"); // Log if the user is not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error in updateImage:", error); // Log any errors that occur during the function
    res.status(500).json({ message: error.message });
  }*/

