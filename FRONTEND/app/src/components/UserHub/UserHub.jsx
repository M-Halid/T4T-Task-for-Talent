import { useState, useEffect } from "react";
import TagInputForSelection from "../Tags/TagInputForSelection";
import TaskFeed from "../Feed/TaskFeed";
import TalentFeed from "../Feed/TalentFeed";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// import TagsContext from "../../contexts/TagsContext";

const Tasks = ({ selectedTags }) => (
  <div>
    <TaskFeed selectedTags={selectedTags} />
  </div>
);

const Talents = ({ selectedTags }) => (
  <div>
    <TalentFeed selectedTags={selectedTags} />
  </div>
);

const UserHub = () => {
  const [showTasks, setShowTasks] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  // const { reset } = useContext(TagsContext);

  const handleToggle = () => {
    setShowTasks(!showTasks);
  };

  // useEffect(() => {
  //   reset();
  // }, []);

  useEffect(() => {
    setRefreshKey((oldKey) => oldKey + 1);
  }, [selectedTags]);

  return (
    <div>
      <div className="flex justify-center items-center pt-12 pb-12 bg-base-100">
        <div className="p-6 bg-base-300 rounded-xl mt-3 mb-10 flex flex-col items-center justify-center space-y-4">
          <div className=" flex items-center justify-between w-full p-10 bg-base-100 rounded-xl mb-10">
            <button className="btn m-2" onClick={() => navigate("/page2")}>
              Task Erstellung
            </button>
            <button
              className="btn m-2"
              onClick={() => navigate("/UserProfile")}
            >
              User Profil
            </button>
            <button className="btn m-2" onClick={() => navigate("/page1")}>
              Talent Profil
            </button>
          </div>
          <div className="w-full flex-col bg-base-100 rounded-xl p-5 ">
            <h2 className="text-primary m-5 justify-center text-center  ">
              Feed Auswahl
            </h2>
            <div className="flex items-center justify-between w-full ">
              <span>Tasks</span>
              <label className="switch switch-accent">
                <input
                  type="checkbox"
                  onChange={handleToggle}
                  checked={!showTasks}
                  className="toggle"
                />
              </label>
              <span>Talents</span>
            </div>
          </div>

          <div>
            <TagInputForSelection
              selectedTags={selectedTags}
              handleTagSelect={(tag) => {
                console.log("Tag selected:", tag); // Log when a tag is selected
                setSelectedTags((prevTags) => {
                  if (prevTags.includes(tag)) {
                    // If the tag is already selected, remove it from the array
                    return prevTags.filter((t) => t !== tag);
                  } else {
                    // If the tag is not selected, add it to the array
                    return [...prevTags, tag];
                  }
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-8/10 mx-auto p-6 bg-base-200 rounded-xl shadow-md">
        {showTasks ? (
          <TaskFeed
            key={refreshKey}
            refreshKey={refreshKey}
            selectedTags={selectedTags}
          />
        ) : (
          <TalentFeed
            key={refreshKey}
            refreshKey={refreshKey}
            selectedTags={selectedTags}
          />
        )}
      </div>
    </div>
  );
};

Tasks.propTypes = {
  selectedTags: PropTypes.array.isRequired,
};

Talents.propTypes = {
  selectedTags: PropTypes.array.isRequired,
};

export default UserHub;
