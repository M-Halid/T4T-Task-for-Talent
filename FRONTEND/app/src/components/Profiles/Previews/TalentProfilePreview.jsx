import PropTypes from "prop-types";

const TalentProfilePreview = ({ profile }) => {
  return (
    <div className="max-w-sm mx-auto bg-base-200 rounded-xl shadow-md flex flex-col items-center space-y-4 p-6">
      <img
        src={profile.profilePicture}
        alt={`${profile.name}'s profile`}
        className="w-24 h-24 rounded-full"
      />
      <h2 className="text-primary mb-2">{profile.name}</h2>
      <p className="text-secondary">{profile.skills}</p>
      <p className="text-secondary">{profile.location}</p>
      <div className="tags flex flex-wrap justify-center">
        {profile.tags.map((tag, index) => (
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

TalentProfilePreview.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default TalentProfilePreview;
