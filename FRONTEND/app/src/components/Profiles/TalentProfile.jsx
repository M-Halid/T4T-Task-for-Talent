import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../App";
import TagInput from "../Tags/TagInput";
import { TagsContext } from "../../contexts/TagsContext";
import Input from "./Inputs/Input";
import profilePlaceholder from "../../assets/profilePlaceholder.jpg";

const TalentProfile = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    workingFields: "",
    age: "",
    gender: null,
    location: "",
    background: "",
    resume: null,
    portfolio: "",
    github: "",
    linkedin: "",
    education: "",
    certifications: "",
    certificationFile: null,
    languages: "",
  });

  // This state will hold the selected profilePicture file
  const [profilePicture, setProfilePicture] = useState(null);

  // This function will be called when the user selects a profilePicture file
  const handleImageUpload = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => {
      if (type === "file") {
        return { ...prevFormData, [name]: "" }; // files[0]
      }

      return { ...prevFormData, [name]: value };
    });
  };

  const { selectedTags, setSelectedTags } = useContext(TagsContext);

  const handleTagSelect = (tag) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const handleSubmit = async (e) => {
    formData.email = isLoggedIn.email;
    e.preventDefault();
    // Add client-side validation here if needed

    try {
      // Make a POST request to the server endpoint
      await axios.post("http://localhost:3000/submitTalent", formData);

      // Optionally, you can handle success or redirect to another page
      console.log("Talent profile submitted successfully");
    } catch (error) {
      console.error("Error submitting talent profile:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-xxl shadow-md bg-base-300 mt-3 mb-10">
          <form className="card-body text-base" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className="w-64 h-64 overflow-hidden relative border-2 border-base-300 rounded-md">
                <img
                  src={profilePicture || profilePlaceholder}
                  alt="Profile"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-10">
              {/* Left column */}
              <div>
                <Input
                  labelText="Name"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  handleChange={handleChange}
                />
                <Input
                  labelText="Fähigkeiten"
                  placeholder="Fähigkeiten"
                  name="skills"
                  value={formData.skills}
                  handleChange={handleChange}
                />

                <Input
                  labelText="Arbeitsfelder"
                  placeholder="Arbeitsfelder"
                  name="workingFields"
                  value={formData.workingFields}
                  handleChange={handleChange}
                />
                <Input
                  labelText="Alter"
                  placeholder="Alter"
                  name="age"
                  type="number"
                  min="18"
                  value={formData.age}
                  handleChange={handleChange}
                />
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Geschlecht</span>
                    <div className="space-x-2">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="radio radio-primary transform scale-75"
                          checked={formData.gender === "male"}
                          onChange={handleChange}
                        />
                        <span className="ml-2 text-sm">Männlich</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className="radio radio-primary transform scale-75"
                          checked={formData.gender === "female"}
                          onChange={handleChange}
                        />
                        <span className="ml-2 text-sm">Weiblich</span>
                      </label>
                    </div>
                  </label>
                </div>
                <Input
                  labelText="Ort/Stadt"
                  placeholder="Ort/Stadt"
                  name="location"
                  value={formData.location}
                  handleChange={handleChange}
                />
                <Input
                  labelText="Languages"
                  placeholder="Languages"
                  name="languages"
                  value={formData.languages}
                  handleChange={handleChange}
                />
                <Input
                  labelText="Hintergrund"
                  placeholder="Hintergrund"
                  name="background"
                  type="textarea"
                  value={formData.background}
                  handleChange={handleChange}
                />
                {/* Add other form fields for the left column here */}
              </div>
              {/* Right column */}
              <div>
                <Input
                  labelText="Resume/CV"
                  name="resume"
                  type="file"
                  handleChange={handleChange}
                />

                <Input
                  labelText="Portfolio"
                  placeholder="Portfolio URL"
                  name="portfolio"
                  value={formData.portfolio}
                  handleChange={handleChange}
                />

                <Input
                  labelText="GitHub"
                  placeholder="GitHub Profile URL"
                  name="github"
                  value={formData.github}
                  handleChange={handleChange}
                />

                <Input
                  labelText="LinkedIn"
                  placeholder="LinkedIn Profile URL"
                  name="linkedin"
                  value={formData.linkedin}
                  handleChange={handleChange}
                />

                <Input
                  labelText="Education"
                  placeholder="Education"
                  name="education"
                  type="textarea"
                  value={formData.education}
                  handleChange={handleChange}
                />

                <Input
                  labelText="Certifications"
                  placeholder="Certifications"
                  name="certifications"
                  type="textarea"
                  value={formData.certifications}
                  handleChange={handleChange}
                />

                <Input
                  labelText="Certifications"
                  name="certificationFile"
                  type="file"
                  handleChange={handleChange}
                />

                {/* Add other form fields for the right column here */}
              </div>
            </div>
            <Input
              labelText="Beschreibungstext"
              placeholder="beschreibe dich"
              name="Beschreibungstext"
              type="textarea"
              value={formData.Beschreibungstext}
              handleChange={handleChange}
            />

            <TagInput handleTagSelect={handleTagSelect} />

            {/* Submit button */}
            <div className="form-control col-span-2 mt-6">
              <input type="submit" value="Einreichen" className="btn" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
