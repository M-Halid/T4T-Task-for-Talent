import PropTypes from "prop-types";

const TaskProfilePreview = ({ task }) => {
  return (
    <div className="card col-span-2 shadow-lg bg-base-300 p-5 ">
      <h2>{task.clientName}</h2>
      <p>{task.clientDescription}</p>
      <p>{task.clientIndustry}</p>
      <p>{task.clientWebsite}</p>
      <p>{task.experienceLevel}</p>
      <p>{task.pay}</p>
      <p>{task.requiredSkills}</p>{" "}
    </div>
  );
};

TaskProfilePreview.propTypes = {
  task: PropTypes.object,
};

export default TaskProfilePreview;
