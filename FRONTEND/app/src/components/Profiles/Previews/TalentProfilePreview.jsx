import PropTypes from "prop-types";

const TalentProfilePreview = ({ talent }) => {
  return (
    <div className="card col-span-2 shadow-lg bg-base-300 p-5 ">
      <h2>{talent.name}</h2>
      <p>{talent.WorkDescription}</p>
      <p>{talent.background}</p>
      <p>{talent.certifications}</p>
      <p>{talent.education}</p>
      <p>{talent.github}</p>
      <p>{talent.portfolio}</p>
      <p>{talent.skills}</p>
      <p>{talent.workingFields}</p>
    </div>
  );
};

TalentProfilePreview.propTypes = {
  talent: PropTypes.object,
};

export default TalentProfilePreview;
