import { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import UserProfilePreview from "../Profiles/Previews/UserProfilePreview";
import TaskProfilePreview from "../Profiles/Previews/TaskProfilePreview";
import AuthContext from "../../contexts/AuthContext";
import PropTypes from "prop-types";

const TaskFeed = ({ selectedTags }) => {
  const [TaskData, setTaskData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const { authToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("selectedTags updated:", selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      axios
        .get(`http://localhost:3000/getAllTaskProfiles?nocache=${Date.now()}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setTaskData(response.data);
            console.log("TaskData:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [authToken, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && authToken) {
      axios
        .get(`http://localhost:3000/getAllUserProfiles?nocache=${Date.now()}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setProfileData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [authToken, isLoggedIn]);

  const sortedTaskData = useMemo(() => {
    return [...TaskData]
      .filter(
        (task) =>
          selectedTags.length === 0 ||
          selectedTags.some((tag) =>
            task.tags
              .map((tag) => tag.toLowerCase())
              .includes(tag.toLowerCase())
          )
      )
      .sort((a, b) => {
        for (let i = 0; i < selectedTags.length; i++) {
          const tag = selectedTags[i].toLowerCase();
          const aHasTag = a.tags.map((tag) => tag.toLowerCase()).includes(tag);
          const bHasTag = b.tags.map((tag) => tag.toLowerCase()).includes(tag);

          if (aHasTag && !bHasTag) return -1;
          if (!aHasTag && bHasTag) return 1;
        }

        return 0;
      });
  }, [TaskData, selectedTags]);

  return (
    <div>
      <div>
        <h2 className="text-primary m-5 justify-center text-center  ">
          Task Feed
        </h2>
      </div>
      <div className="flex flex-col items-center">
        {sortedTaskData.map((task) => {
          const profile = profileData.find(
            (profile) => profile._id === task.userId
          );
          if (profile) {
            return (
              <div
                className="grid grid-cols-3 gap-10 bg-accent shadow-md rounded-lg p-4 m-4 w-3/4"
                key={task._id}
              >
                <UserProfilePreview profile={profile} className="col-span-1" />
                <TaskProfilePreview task={task} className="col-span-2" />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

TaskFeed.propTypes = {
  selectedTags: PropTypes.array.isRequired,
};

export default TaskFeed;
