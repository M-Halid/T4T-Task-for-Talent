import proptypes from "prop-types";
import TagsContext from "../../contexts/TagsContext";
import TagInput from "./TagInput";
import { useContext } from "react";

const Tags = ({ handleTagClick }) => {
  const { tags, tagOptions } = useContext(TagsContext);

  console.log(tagOptions);
  return (
    <div>
      <TagInput tags={tagOptions} handleTagSelect={handleTagClick} />
      {tags.map((tag, index) => (
        <button key={index} onClick={() => handleTagClick(tag)}>
          {tag}
        </button>
      ))}
    </div>
  );
};

Tags.propTypes = {
  handleTagClick: proptypes.func,
};

export default Tags;
