import { useState, useContext } from "react";
import proptypes from "prop-types";
import { TagsContext } from "../../contexts/TagsContext";

const TagInputForSelection = ({ selectedTags, handleTagSelect }) => {
  const { tags, selectedCategory, setSelectedCategory, setSelectedTags } =
    useContext(TagsContext);
  const [inputValue, setInputValue] = useState("");

  const matchingTags = tags[selectedCategory].filter((tag) =>
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleTagClick = (tag) => {
    handleTagSelect(tag);
    setInputValue("");
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="flex flex-col items-center pb-4 bg-base-100 rounded-xl w-full mt-10">
      <h4 className="m-10">Relevante Technologien</h4>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="input input-bordered w-2/3"
      >
        {Object.keys(tags).map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input input-bordered w-2/3"
      />
      {inputValue &&
        matchingTags.map((tag, index) => (
          <div key={index} onClick={() => handleTagClick(tag)}>
            {tag}
          </div>
        ))}
      <div className="selected-tags-container mt-5">
        {selectedTags.map((tag, index) => (
          <button
            className="btn btn-ghost btn-sm"
            key={index}
            onClick={() => handleTagRemove(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

TagInputForSelection.propTypes = {
  handleTagSelect: proptypes.func.isRequired,
  selectedTags: proptypes.array.isRequired,
};

export default TagInputForSelection;
