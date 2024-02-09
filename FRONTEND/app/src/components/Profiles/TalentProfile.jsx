import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import TagInput from "../Tags/TagInput";
import { TagsContext } from "../../contexts/TagsContext";
import Input from "./Inputs/Input";
import profilePlaceholder from "../../assets/profilePlaceholder.jpg";

const TalentProfile = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: isLoggedIn.name,
    skills: "",
    workingFields: "",
    background: "",
    resume: null,
    portfolio: "",
    github: "",
    education: "",
    certifications: "",
    certificationFile: null,
  });

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
        <div className="card shrink-0 w-full max-w-xxl shadow-xl bg-base-300 mt-3 mb-10">
          <form className="card-body text-base mb-5" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center flex-col">
              <div>
                <h3 className="text-primary text-center mb-4 ">
                  Talent Profil
                </h3>
              </div>
              <div className="w-64 h-64 overflow-hidden relative border-2 border-base-300 rounded-md mb-10">
                <img
                  src={isLoggedIn.profileImage || profilePlaceholder}
                  alt="Profile"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-10 mb-5">
              {/* Left column */}
              <div>
                <Input
                  labelText="Arbeitsfelder"
                  placeholder="Arbeitsfelder"
                  name="workingFields"
                  value={formData.workingFields}
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
              labelText="Hintergrund"
              placeholder="Hintergrund"
              name="background"
              type="textarea"
              value={formData.background}
              handleChange={handleChange}
            />
            <Input
              labelText="Ausbildung"
              placeholder="beschreibe relevante Schritte deiner Ausbildung"
              name="edducation"
              type="textarea"
              value={formData.education}
              handleChange={handleChange}
            />
            <Input
              labelText="Beschreibung"
              placeholder="beschreibe deine Arbeit"
              name="WorkDescription"
              type="textarea"
              value={formData.WorkDescription}
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
