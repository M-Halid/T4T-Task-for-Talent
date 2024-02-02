import PropTypes from "prop-types";

const TaskProfilePreview = ({ task }) => {
  return (
    <div className="max-w-sm mx-auto bg-base-200 rounded-xl shadow-md flex flex-col items-center space-y-4 p-6">
      <img
        src={task.clientLogo}
        alt={`${task.clientName}'s logo`}
        className="w-24 h-24 rounded-full"
      />
      <h2 className="text-primary mb-2">{task.clientName}</h2>
      <p className="text-secondary">{task.clientDescription}</p>
      <div className="tags flex flex-wrap justify-center">
        {task.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-accent rounded-full px-2 py-1 text-xs font-medium text-white m-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

TaskProfilePreview.propTypes = {
  task: PropTypes.shape({
    clientName: PropTypes.string.isRequired,
    clientLogo: PropTypes.string.isRequired,
    clientDescription: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default TaskProfilePreview;
