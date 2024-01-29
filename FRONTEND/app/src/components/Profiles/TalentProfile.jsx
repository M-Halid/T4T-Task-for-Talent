import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../App'; // Pfad zu Ihrer App-Komponente


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
    userId: "",
    languages: "",
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

  const handleSubmit = async (e) => {
    formData.userId = isLoggedIn.id;
    e.preventDefault();
    console.log(formData);
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
      <div className="card bg-base-100 shadow-xl">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-xxl shadow-2xl bg-base-100">
            <form
              className="card-body grid grid-cols-2"
              onSubmit={handleSubmit}
            >
              {/* Left column */}
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fähigkeiten</span>
                    <input
                      type="text"
                      placeholder="Fähigkeiten"
                      className="input input-bordered"
                      name="skills"
                      required
                      value={formData.skills}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Arbeitsfelder</span>
                    <input
                      type="text"
                      placeholder="Arbeitsfelder"
                      className="input input-bordered"
                      name="workingFields"
                      required
                      value={formData.workingFields}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Alter</span>
                    <input
                      type="number"
                      placeholder="Alter"
                      className="input input-bordered"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="18"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Geschlecht</span>
                    <div className="space-x-2">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="radio radio-primary"
                          checked={formData.gender === "male"}
                          onChange={handleChange}
                        />
                        <span className="ml-2">Männlich</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className="radio radio-primary"
                          checked={formData.gender === "female"}
                          onChange={handleChange}
                        />
                        <span className="ml-2">Weiblich</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="diverse"
                          className="radio radio-primary"
                          checked={formData.gender === "diverse"}
                          onChange={handleChange}
                        />
                        <span className="ml-2">Divers</span>
                      </label>
                    </div>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Ort/Stadt</span>
                    <input
                      type="text"
                      placeholder="Ort/Stadt"
                      className="input input-bordered"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Hintergrund</span>
                    <textarea
                      placeholder="Hintergrund"
                      className="textarea textarea-bordered"
                      name="background"
                      value={formData.background}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                </div>
                {/* Add other form fields for the left column here */}
              </div>
              {/* Right column */}
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Resume/CV</span>
                    <input
                      type="file"
                      className="input input-bordered"
                      name="resume"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Portfolio</span>
                    <input
                      type="text"
                      placeholder="Portfolio URL"
                      className="input input-bordered"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">GitHub</span>
                    <input
                      type="text"
                      placeholder="GitHub Profile URL"
                      className="input input-bordered"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">LinkedIn</span>
                    <input
                      type="text"
                      placeholder="LinkedIn Profile URL"
                      className="input input-bordered"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Education</span>
                    <textarea
                      placeholder="Education"
                      className="textarea textarea-bordered w-full"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Certifications</span>
                    <textarea
                      placeholder="Certifications"
                      className="textarea textarea-bordered w-full"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleChange}
                    ></textarea>
                    <input
                      type="file"
                      className="input input-bordered"
                      name="certificationFile"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Languages</span>
                    <input
                      type="text"
                      placeholder="Languages"
                      className="input input-bordered"
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {/* Add other form fields for the right column here */}
              </div>
              {/* Submit button */}
              <div className="form-control col-span-2 mt-6">
                <input type="submit" value="Einreichen" className="btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
