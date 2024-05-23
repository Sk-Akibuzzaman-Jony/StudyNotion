import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const RequirementsField = ({requirements, setRequirements}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddRequirement = () => {
    if (inputValue !== "") {
      setRequirements((prevRequirements) => [...prevRequirements, inputValue]);
      setInputValue(""); 
    }
  };

  const handleDeleteRequirement = (index) => {
    const updatedRequirementsList = [...requirements];
    updatedRequirementsList.splice(index, 1);
    setRequirements(updatedRequirementsList);
  };

  return (
    <div>
      <label
        htmlFor="requirements"
        className="block mb-2 mt-4 text-sm font-medium text-richblack-5"
      >
        Requirements <span className="text-red-500">*</span>
      </label>
      <div className="flex">
        <input
          type="text"
          placeholder="Enter Requirements and press Add"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-gray-50 border border-richblack-800 text-richblack-200 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 bg-richblack-800 dark:border-gray-600"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="bg-primary-600 text-white font-bold py-2 px-4 rounded-r-lg"
        >
          Add
        </button>
      </div>
      {requirements.map((requirement, index) => (
            <div key={index} className="flex">
              {requirement}{" "}
              <button onClick={() => handleDeleteRequirement(index)}>
                <IoIosClose />
              </button>
            </div>
          ))}
    </div>
  );
};

export default RequirementsField;

