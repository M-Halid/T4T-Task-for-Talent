import { useState } from "react";

const UserHub = () => {
  const [showTasks, setShowTasks] = useState(true);

  const handleToggle = () => {
    setShowTasks(!showTasks);
  };

  const TaskFeed = () => <div>Task Feed Placeholder</div>;
  const FreelancerFeed = () => <div>Freelancer Feed Placeholder</div>;

  const showTasksLabel = "Tasks";
  const showFreelancersLabel = "Talents";

  return (
    <div className="bg-base-100">
      <div className="p-6 max-w-sm mx-auto bg-base-200 rounded-xl shadow-md flex flex-col items-center space-y-4">
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
      </div>
      <div className="w-8/10 mx-auto p-6 bg-base-200 rounded-xl shadow-md mt-6">
        {showTasks ? <TaskFeed /> : <FreelancerFeed />}
      </div>
    </div>
  );
};

export default UserHub;
