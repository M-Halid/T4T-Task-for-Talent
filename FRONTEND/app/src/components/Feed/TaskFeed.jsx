import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserProfilePreview from "../Profiles/Previews/UserProfilePreview";
import TaskProfilePreview from "../Profiles/Previews/TaskProfilePreview";
import AuthContext from "../../contexts/AuthContext";

const TaskFeed = () => {
  const [TaskData, setTaskData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const { authToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      console.log("Attempting to fetch task profiles...");
      axios
        .get("http://localhost:3000/getAllTaskProfiles", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          console.log("Received response from server:", response);
          if (Array.isArray(response.data)) {
            console.log("Setting TaskData with fetched data:", response.data);
            setTaskData(response.data);
          } else {
            console.log("Received non-array data from server:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.log("User is not logged in or authToken is not available");
    }
    console.log("authToken", authToken);
  }, [authToken, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      console.log("Attempting to fetch user profiles...");
      axios
        .get("http://localhost:3000/getAllUserProfiles", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          console.log("Received response from server:", response);
          if (Array.isArray(response.data)) {
            console.log(
              "Setting profileData with fetched data:",
              response.data
            );
            setProfileData(response.data);
          } else {
            console.log("Received non-array data from server:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
    console.log("TaskData", TaskData);
  }, [authToken, isLoggedIn, TaskData]);

  return (
    <div className="flex flex-wrap">
      {profileData.map((profile) => {
        const task = TaskData.find((task) => task.userId === profile._id);
        if (task) {
          return (
            <div className="flex space-x-4 w-screen" key={profile._id}>
              <UserProfilePreview profile={profile} />
              <TaskProfilePreview task={task} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default TaskFeed;
