import { useState, useContext } from "react";
import TagInput from "../Tags/TagInput";
import { TagsContext } from "../../contexts/TagsContext";
import UserContext from "../../contexts/UserContext";
import TalentContext from "../../contexts/TalentContext";
import TaskContext from "../../contexts/TaskContext";

const UserHub = () => {
  // Feed selection
  const [showTasks, setShowTasks] = useState(true);

  const handleToggle = () => {
    setShowTasks(!showTasks);
  };

  const TaskFeed = () => <div>Task Feed Placeholder</div>;
  const FreelancerFeed = () => <div>Freelancer Feed Placeholder</div>;

  const showTasksLabel = "Tasks";
  const showFreelancersLabel = "Talents";

  // Tags
  const { selectedTags, setSelectedTags } = useContext(TagsContext);

  // User, Talent, and Task profiles
  const { userProfile } = useContext(UserContext);
  const { talentProfile } = useContext(TalentContext);
  const { taskProfile } = useContext(TaskContext);

  const handleTagSelect = (tag) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  return (
    <div>
      <div className="flex justify-center items-center pt-12 pb-12 bg-base-100">
        <div className="p-6 bg-base-300 rounded-xl mt-3 mb-10 flex flex-col items-center justify-center space-y-4">
          <h2 className="text-primary mb-2">Choose your view</h2>
          <div className="flex items-center justify-between w-full">
            <span className="text-secondary">{showTasksLabel}</span>
            <label className="switch switch-accent">
              <input
                type="checkbox"
                onChange={handleToggle}
                checked={!showTasks}
                className="toggle"
              />
            </label>
            <span className="text-secondary">{showFreelancersLabel}</span>
          </div>
          <TagInput handleTagSelect={handleTagSelect} />
        </div>
      </div>

      <div className="w-8/10 mx-auto p-6 bg-base-200 rounded-xl shadow-md">
        {showTasks ? <TaskFeed /> : <FreelancerFeed />}
      </div>
    </div>
  );
};

export default UserHub;
