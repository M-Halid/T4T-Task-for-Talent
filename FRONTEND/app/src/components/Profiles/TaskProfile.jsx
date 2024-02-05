import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../App"; // Path to your App component
import Input from "./Inputs/Input";
import TagInput from "../Tags/TagInput";
import { TagsContext } from "../../contexts/TagsContext";

const TaskProfile = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    taskDescription: "",
    requiredSkills: "",
    experienceLevel: "",
    clientName: "",
    clientIndustry: "",
    clientWebsite: "",
    clientLogo: "",
    clientDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const { selectedTags, setSelectedTags } = useContext(TagsContext);

  const handleTagSelect = (tag) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const handleSubmit = async (e) => {
    formData.userId = isLoggedIn.id;
    e.preventDefault();
    console.log(formData);
    // Add client-side validation here if needed

    try {
      // Make a POST request to the server endpoint
      await axios.post("http://localhost:3000/submitTask", formData);

      // Optionally, you can handle success or redirect to another page
      console.log("Task profile submitted successfully");
    } catch (error) {
      console.error("Error submitting task profile:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-xxl shadow-md bg-base-300 mt-3 mb-3">
          <form className="card-body text-base" onSubmit={handleSubmit}>
            <Input
              labelText="Task Description"
              placeholder="Enter task description"
              name="taskDescription"
              type="textarea"
              value={formData.taskDescription}
              handleChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-x-10">
              {/* Left column */}
              <div>
                <Input
                  labelText="Client Name"
                  placeholder="Enter client name"
                  name="clientName"
                  type="text"
                  value={formData.clientName}
                  handleChange={handleChange}
                />
                <Input
                  labelText="Required Skills"
                  placeholder="Enter required skills"
                  name="requiredSkills"
                  type="text"
                  value={formData.requiredSkills}
                  handleChange={handleChange}
                />
                <Input
                  labelText="Experience Level"
                  placeholder="Enter experience level"
                  name="experienceLevel"
                  type="text"
                  value={formData.experienceLevel}
                  handleChange={handleChange}
                />
              </div>
              {/* Right column */}
              <div>
                <Input
                  labelText="Client Industry"
                  placeholder="Enter client industry"
                  name="clientIndustry"
                  type="text"
                  value={formData.clientIndustry}
                  handleChange={handleChange}
                />
                <Input
                  labelText="Client Website"
                  placeholder="Enter client website"
                  name="clientWebsite"
                  type="text"
                  value={formData.clientWebsite}
                  handleChange={handleChange}
                />
                <Input
                  labelText="Client Logo"
                  placeholder="Enter client logo URL"
                  name="clientLogo"
                  type="text"
                  value={formData.clientLogo}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <Input
              labelText="Client Description"
              placeholder="Enter client description"
              name="clientDescription"
              type="textarea"
              value={formData.clientDescription}
              handleChange={handleChange}
            />
            <TagInput handleTagSelect={handleTagSelect} />
            {/* Submit button */}
            <div className="form-control col-span-2 mt-6">
              <input type="submit" value="Submit" className="btn" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskProfile;
