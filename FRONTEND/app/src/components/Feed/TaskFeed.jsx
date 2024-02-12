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
    <div className="flex flex-col items-center">
      {profileData.map((profile) => {
        const task = TaskData.find((task) => task.userId === profile._id);
        if (task) {
          return (
            <div
              className="grid grid-cols-3 gap-10 bg-accent shadow-md rounded-lg p-4 m-4 w-3/4"
              key={profile._id}
            >
              <UserProfilePreview profile={profile} className="col-span-1" />
              <TaskProfilePreview task={task} className="col-span-2" />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
export default TaskFeed;
