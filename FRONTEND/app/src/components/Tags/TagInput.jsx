import { useState, useContext } from "react";
import proptypes from "prop-types";
import { TagsContext } from "../../contexts/TagsContext";

const TagInput = ({ handleTagSelect }) => {
  const {
    tags,
    selectedTags,
    setSelectedTags,
    selectedCategory,
    setSelectedCategory,
  } = useContext(TagsContext);
  const [inputValue, setInputValue] = useState("");

  const matchingTags = tags[selectedCategory].filter((tag) =>
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleTagClick = (tag) => {
    // Add the clicked tag to the selected tags
    setSelectedTags([...selectedTags, tag]);
    // Clear the input field
    setInputValue("");
  };

  return (
    <div className="flex flex-col items-center">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {Object.keys(tags).map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="pb-4">
        <h6>enter tags describing skills and technologies</h6>
      </div>
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
