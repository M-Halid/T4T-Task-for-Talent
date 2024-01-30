import { useState, useContext } from "react";
import proptypes from "prop-types";
import { TagsContext } from "../../contexts/TagsContext";

const TagInput = ({ handleTagSelect }) => {
  const { tags, selectedTags, setSelectedTags } = useContext(TagsContext);
  const [inputValue, setInputValue] = useState("");

  const matchingTags = tags.filter((tag) =>
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleTagClick = (tag) => {
    // Add the clicked tag to the selected tags
    setSelectedTags([...selectedTags, tag]);
    // Clear the input field
    setInputValue("");
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue &&
        matchingTags.map((tag, index) => (
          <div key={index} onClick={() => handleTagClick(tag)}>
            {tag}
          </div>
        ))}
      <div className="selected-tags-container">
        {selectedTags.map((tag, index) => (
          <button key={index} onClick={() => handleTagSelect(tag)}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

TagInput.propTypes = {
  handleTagSelect: proptypes.func,
};

export default TagInput;
