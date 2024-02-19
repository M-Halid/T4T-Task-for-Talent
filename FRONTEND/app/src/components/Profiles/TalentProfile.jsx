import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import TagInputForStorage from "../Tags/TagInputForStorage";
import { TagsContext } from "../../contexts/TagsContext";
import Input from "./Inputs/Input";
import profilePlaceholder from "../../assets/profilePlaceholder.jpg";

const TalentProfile = () => {
  const { isLoggedIn, authToken, userEmail, setUserEmail } =
    useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(true);
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
  const { selectedTags, setSelectedTags } = useContext(TagsContext);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      console.log(`Sending request with auth token: ${authToken}`);
      axios
        .get("http://localhost:3000/TalentProfile", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (response.status === 204) {
            console.log("No TalentProfile exists yet for this user");
            setFormData({
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
              tags: [],
            });
            setSelectedTags([]);
          } else {
            setFormData(response.data);
            setSelectedTags(response.data.tags); // Set the selected tags
          }
        })
        .catch((error) => {
          console.error("Error fetching talent profile:", error);
        });
    }
  }, [isLoggedIn, authToken, setSelectedTags]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleTagSelect = (tag) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Beginning talent update:", userEmail);
    try {
      console.log(authToken);

      // Add the selected tags to the formData
      const updatedFormData = { ...formData, tags: selectedTags };

      const response = await axios.put(
        "http://localhost:3000/updateTalentProfile",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 404) {
        // TalentProfile doesn't exist, create a new one
        const createResponse = await axios.post(
          "http://localhost:3000/postTalentProfile",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("New talent profile created:", createResponse.data);
        return;
      }

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = response.data;
      console.log(result);

      if (result.email) {
        setUserEmail(result.email);
      }
      console.log("After setUserEmail result:", userEmail);
    } catch (error) {
      console.error("Error updating talent profile:", error.message);
    } finally {
      setIsEditing(!isEditing);
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
            <button type="button" onClick={() => setIsEditing(!isEditing)}>
              Edit Profile
            </button>
            <div className="grid grid-cols-2 gap-x-10 mb-5">
              {/* Left column */}
              <div>
                <Input
                  labelText="Arbeitsfelder"
                  placeholder="Arbeitsfelder"
                  name="workingFields"
                  value={formData.workingFields}
                  handleChange={handleChange}
                  readOnly={isEditing}
                />
                <Input
                  labelText="Portfolio"
                  placeholder="Portfolio URL"
                  name="portfolio"
                  value={formData.portfolio}
                  handleChange={handleChange}
                  readOnly={isEditing}
                />

                <Input
                  labelText="GitHub"
                  placeholder="GitHub Profile URL"
                  name="github"
                  value={formData.github}
                  handleChange={handleChange}
                  readOnly={isEditing}
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
                  readOnly={isEditing}
                />

                <Input
                  labelText="Certifications"
                  placeholder="Certifications"
                  name="certifications"
                  type="textarea"
                  value={formData.certifications}
                  handleChange={handleChange}
                  readOnly={isEditing}
                />

                <Input
                  labelText="Certifications"
                  name="certificationFile"
                  type="file"
                  handleChange={handleChange}
                  readOnly={isEditing}
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
              readOnly={isEditing}
            />
            <Input
              labelText="Ausbildung"
              placeholder="beschreibe relevante Schritte deiner Ausbildung"
              name="edducation"
              type="textarea"
              value={formData.education}
              handleChange={handleChange}
              readOnly={isEditing}
            />
            <Input
              labelText="Beschreibung"
              placeholder="beschreibe deine Arbeit"
              name="WorkDescription"
              type="textarea"
              value={formData.WorkDescription}
              handleChange={handleChange}
              readOnly={isEditing}
            />

            <TagInputForStorage handleTagSelect={handleTagSelect} />

            {/* Submit button */}
            {!isEditing ? (
              <div className="form-control col-span-2 mt-6">
                <input type="submit" value="Einreichen" className="btn" />
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
