import { useRef } from "react";
import Button from "../core/HomePage/Button";
import { MdOutlineFileUpload } from "react-icons/md";

export const UploadButton = ({ setFile,  setPreviewImage}) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <div onClick={handleClick}>
        <Button className="button-upload" active={true}>
          <div className="flex gap-1">
          Select Photo
          <div className="text-lg -translate-y-[1px]">
          <MdOutlineFileUpload />
          </div>
          </div>
        </Button>
      </div>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }} // Make the file input element invisible
      />
    </>
  );
};
