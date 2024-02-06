import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import {TalentProfileModel} from "../models/talent.model.js";
import {TaskProfileModel} from "../models/task.model.js";
import e from "cors";

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
    const [user, talent] = await Promise.all([
      User.findOne({ email }),
      TalentProfileModel.findOne({ email }),
    ]);

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

          const talentResponse = talent
            ? {
                talent,
              }
            : {};

          res.json({
            user: userResponse,
            talent: talentResponse,
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
    await signin({ body: {email: email, password: password } }, res );

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const newProfileTalent = async (req, res) => {
  
  // Handle form submission
    try {
      const talentProfile = new TalentProfileModel(req.body);
      await talentProfile.save();
      res.status(201).json({ message: 'Talent profile submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

export const newProfileTask = async (req, res) => {
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
export const updateTalent = async (req, res) => {
  const { email, updatedProfile } = req.body;
  console.log("email:", email, "updatedProfile:", updatedProfile);
 try {
      // Assuming you have some database connection and models set up
      const existingTalent = await TalentProfileModel.findOne({ email });

      if (!existingTalent) {
      console.log('Talent profile not found and creating a new profile');
      try {
        const talentProfile = new TalentProfileModel(updatedProfile);
        await talentProfile.save();
        res.status(201).json({ message: 'Talent profile submitted successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
      }else{

      // Update the talent profile with the new data
      existingTalent.set(updatedProfile);
      await existingTalent.save();

      return { message: 'Talent profile updated successfully' };}
  } catch (error) {
      console.error('Error updating talent profile:', error);
      
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

