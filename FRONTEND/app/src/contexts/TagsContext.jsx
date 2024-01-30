import { createContext, useState } from "react";
import proptypes from "prop-types";

export const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState(["tag1", "tag2", "tag3"]); // Define your tags here
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <TagsContext.Provider
      value={{ tags, setTags, selectedTags, setSelectedTags }}
    >
      {children}
    </TagsContext.Provider>
  );
};
TagsProvider.propTypes = {
  children: proptypes.node,
};

export default TagsContext;
