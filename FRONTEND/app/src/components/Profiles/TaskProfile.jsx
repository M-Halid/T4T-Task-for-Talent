import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import Input from "./Inputs/Input";
import TagInput from "../Tags/TagInput";
import { TagsContext } from "../../contexts/TagsContext";

const TaskProfile = () => {
  const { isLoggedIn, authToken, userEmail, setUserEmail } =
    useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    taskDescription: "",
    requiredSkills: "",
    experienceLevel: "",
    clientName: "",
    clientIndustry: "",
    clientWebsite: "",
    pay: "",
    clientDescription: "",
    tags: [],
  });
  const { selectedTags, setSelectedTags } = useContext(TagsContext);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      console.log(`Sending request with auth token: ${authToken}`);
      axios
        .get("http://localhost:3000/TaskProfile", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (response.status === 204) {
            console.log("No TaskProfile exists yet for this user");
            setFormData({
              taskDescription: "",
              requiredSkills: "",
              experienceLevel: "",
              clientName: "",
              clientIndustry: "",
              clientWebsite: "",
              pay: "",
              clientDescription: "",
              tags: [],
            });
            setSelectedTags([]);
          } else {
            setFormData(response.data);
            setSelectedTags(response.data.tags); // Set the selected tags
          }
        })
        .catch((error) => {
          console.error("Error fetching task profile:", error);
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
    console.log("Beginning task update:", userEmail);
    try {
      console.log(authToken);

      // Add the selected tags to the formData
      const updatedFormData = { ...formData, tags: selectedTags };

      const response = await axios.put(
        "http://localhost:3000/updateTaskProfile",
        updatedFormData, // Use the updated formData
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 404) {
        // TaskProfile doesn't exist, create a new one
        const createResponse = await axios.post(
          "http://localhost:3000/postTaskProfile",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("New task profile created:", createResponse.data);
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
      console.error("Error updating task profile:", error.message);
    } finally {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-xxl shadow-xl bg-base-300 mt-3 mb-10">
          <form className="card-body text-base" onSubmit={handleSubmit}>
            <h3 className="text-primary text-center mb-4">
              Erstelle einen Task
            </h3>
            <div className="mb-8 mt-10">
              <Input
                labelText="Task Description"
                placeholder="Enter task description"
                name="taskDescription"
                type="textarea"
                value={formData.taskDescription}
                handleChange={handleChange}
              />
            </div>
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
                  labelText="Pay"
                  placeholder="enter pay amount"
                  name="pay"
                  type="text"
                  value={formData.pay}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-8">
              <Input
                labelText="Client Description"
                placeholder="Enter client description"
                name="clientDescription"
                type="textarea"
                value={formData.clientDescription}
                handleChange={handleChange}
              />
            </div>
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
