import PropTypes from "prop-types";

const UserProfilePreview = ({ profile }) => {
  return (
    <div className="card w-auto shadow-lg bg-base-300 p-5 ">
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      <p>{profile.age}</p>
      <p>{profile.gender}</p>
      <p>{profile.joined}</p>
      <p>{profile.languages}</p>
      <p>{profile.linkedin}</p>
      <p>{profile.location}</p>
    </div>
  );
};

UserProfilePreview.propTypes = {
  profile: PropTypes.object,
};

export default UserProfilePreview;
