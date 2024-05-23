import React from "react";
import AddSubsection from "./AddSubsection";
import { Link } from "react-router-dom";
import { RxDropdownMenu } from "react-icons/rx";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { setCourse, setEditSubsection } from "../../../../slices/courseSlice";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../services/operations/courseDetailsAPI";
import { MdEdit } from "react-icons/md";

const NestedView = ({ section, setEditCourse, course }) => {
  // console.log("Section ", section);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const handleDeleteSection = async () => {
    const data = { sectionId: section._id, courseId: course._id };
    const result = await deleteSection(data, token);
    if (result) {
      dispatch(setCourse(result));
    }
  };

  const handleDeleteSubSection = async (subSectionId) => {
    const data = { subSectionID: subSectionId, courseId: course._id };
    console.log(data);
    const result = await deleteSubSection(data, token);
    if (result) {
      dispatch(setCourse(result));
    }
  };

  return (
    <div>
      <div className="text-richblack-25 flex justify-between gap-3 font-bold text-lg">
        <details key={section._id} open className="w-full">
          <summary className="flex justify-between my-2 items-center">
            <div className="flex gap-2 items-center">
              <RxDropdownMenu className="text-3xl" />
              {section.sectionName}
            </div>{" "}
            <div className="flex items-center gap-3">
              <FaEdit
                className="text-3xl text-yellow-100"
                onClick={() => {
                  dispatch(setEditCourse(section));
                }}
              />
              <RiDeleteBin5Line
                className="text-3xl text-richblack-200"
                onClick={handleDeleteSection}
              />
              <AddSubsection section={section} />
            </div>
          </summary>
          <hr className="text-richblack-500" />
          {section?.subSection?.map((subSec, index) => (
            <div
              key={index}
              className="flex gap-2 ml-5 m-4 items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <VscDebugBreakpointLog />
                {subSec?.title}
                <Link
                  to={subSec?.videoUrl}
                  target="_blank"
                  className="text-blue-100 underline"
                >
                  Video
                </Link>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <MdEdit className="text-2xl" onClick={()=>{dispatch(setEditSubsection(subSec))}}/>
                  <RiDeleteBin5Line
                    className="text-2xl text-richblack-200"
                    onClick={() => handleDeleteSubSection(subSec._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </details>
      </div>
    </div>
  );
};

export default NestedView;
