import proptypes from "prop-types";
import TagInput from "./TagInput";

const Tags = ({ tags, handleTagClick }) => (
  <div>
    <TagInput tags={tags} handleTagSelect={handleTagClick} />
    {tags.map((tag, index) => (
      <button key={index} onClick={() => handleTagClick(tag)}>
        {tag}
      </button>
    ))}
  </div>
);

Tags.propTypes = {
  tags: proptypes.arrayOf(proptypes.string),
  handleTagClick: proptypes.func,
};

export default Tags;
