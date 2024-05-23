import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const InputTag = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddRequirement = () => {
    if (inputValue.trim() !== "") {
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddRequirement();
    }
  };

  const handleDeleteRequirement = (index) => {
    const updatedTagsList = [...tags];
    updatedTagsList.splice(index, 1);
    setTags(updatedTagsList);
  };

  return (
    <div>
      <label
        htmlFor="tags"
        className="block mb-2 mt-4 text-sm font-medium text-richblack-5"
      >
        Tags <span className="text-red-500">*</span>
      </label>
      <div className="mb-2 flex gap-2">
        {tags.map((requirement, index) => (
          <div
            key={index}
            className="flex bg-yellow-50 w-fit text-richblack-900 rounded-lg px-2 py-1"
          >
            {requirement}{" "}
            <button
              type="button"
              onClick={() => handleDeleteRequirement(index)}
            >
              <IoIosClose />
            </button>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="Enter tags and press enter or comma to add"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
        />
      </div>
    </div>
  );
};

export default InputTag;
