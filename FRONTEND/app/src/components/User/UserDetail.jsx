import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext"; // Pfad zu Ihrer App-Komponente
import Input from "../Profiles/Inputs/Input";
import profilePlaceholder from "../../assets/profilePlaceholder.jpg";

const UserDetail = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(true);

  const [formData, setFormData] = useState({
    name: isLoggedIn.name, //required
    skills: isLoggedIn.skills, //required
    workingFields: isLoggedIn.workingFields, //required
    age: isLoggedIn.age, //required
    gender: isLoggedIn.gender,
    location: isLoggedIn.location,
    background: isLoggedIn.background,
    resume: isLoggedIn.resume,
    portfolio: isLoggedIn.portfolio,
    github: isLoggedIn.github,
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

  const updateTalent = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/updateTalent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: isLoggedIn.email,
        updatedProfile: formData,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        //setIsEditing(!isEditing);
        // Handle success, update UI, show messages, etc.
      })
      .catch((error) => {
        console.error("Error updating talent profile:", error.message);
        // Handle error, show error messages, etc.
      });

    setIsEditing(!isEditing);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="card bg-base-100 shadow-xl">
        <div className="flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-xxl shadow-2xl bg-base-100">
            <form className="card-body text-base" onSubmit={updateTalent}>
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
                    readOnly={isEditing}
                  />
                </div>
              </div>
              <button type="button" onClick={() => setIsEditing(!isEditing)}>
                Edit Profile
              </button>

              <div className="grid grid-cols-2 gap-x-10">
                {/* Left column */}
                <div>
                  <Input
                    labelText="Name"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />
                  <Input
                    labelText="Fähigkeiten"
                    placeholder="Fähigkeiten"
                    name="skills"
                    value={formData.skills}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />

                  <Input
                    labelText="Arbeitsfelder"
                    placeholder="Arbeitsfelder"
                    name="workingFields"
                    value={formData.workingFields}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />
                  <Input
                    labelText="Alter"
                    placeholder="Alter"
                    name="age"
                    type="number"
                    min="18"
                    value={formData.age}
                    handleChange={handleChange}
                    readOnly={isEditing}
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
                            disabled={isEditing}
                            //disabled
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
                            disabled={isEditing}
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
                    readOnly={isEditing}
                  />
                  <Input
                    labelText="Languages"
                    placeholder="Languages"
                    name="languages"
                    value={formData.languages}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />
                  <Input
                    labelText="Hintergrund"
                    placeholder="Hintergrund"
                    name="background"
                    type="textarea"
                    value={formData.background}
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

                  <Input
                    labelText="LinkedIn"
                    placeholder="LinkedIn Profile URL"
                    name="linkedin"
                    value={formData.linkedin}
                    handleChange={handleChange}
                    readOnly={isEditing}
                  />

                  <Input
                    labelText="Education"
                    placeholder="Education"
                    name="education"
                    type="textarea"
                    value={formData.education}
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
                labelText="Beschreibungstext"
                placeholder="beschreibe dich"
                name="Beschreibungstext"
                type="textarea"
                value={formData.Beschreibungstext}
                handleChange={handleChange}
                readOnly={isEditing}
              />
              {/* Submit button */}
              {!isEditing ? (
                <div className="form-control col-span-2 mt-6">
                  <input type="submit" value="SPEICHERN" className="btn" />
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
