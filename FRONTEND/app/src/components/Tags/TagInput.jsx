import { useState } from "react";
import proptypes from "prop-types";

const TagInput = ({ tags, handleTagSelect }) => {
  const [inputValue, setInputValue] = useState("");

  const matchingTags = tags.filter((tag) =>
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {matchingTags.map((tag, index) => (
        <div key={index} onClick={() => handleTagSelect(tag)}>
          {tag}
        </div>
      ))}
    </div>
  );
};
TagInput.propTypes = {
  tags: proptypes.arrayOf(proptypes.string),
  handleTagSelect: proptypes.func,
};
export default TagInput;
