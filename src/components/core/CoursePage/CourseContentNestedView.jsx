import React from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const CourseContentNestedView = ({ section }) => {
  return (
    <div>
      <div className="text-richblack-25 flex justify-between gap-3 font-bold text-lg border border-richblack-500 rounded-2xl">
        <details key={section._id} open className="w-full">
          <summary className="flex justify-between items-center bg-richblack-700 px-2 py-3 rounded-2xl">
            <div className="flex gap-2 items-center ">
              <RxDropdownMenu className="text-3xl" />
              {section.sectionName}
            </div>{" "}
          </summary>
          {section?.subSection?.map((subSec, index) => (
            <div
              key={index}
              className="flex gap-2 ml-5 m-4 items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <VscDebugBreakpointLog />
                {subSec?.title}
              </div>
              <div></div>
            </div>
          ))}
        </details>
      </div>
    </div>
  );
};

export default CourseContentNestedView;
