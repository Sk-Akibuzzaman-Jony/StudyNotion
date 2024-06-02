import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const CourseContentNestedView = ({ section, isFirst, isLast }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="text-richblack-25 font-bold text-lg rounded-2xl border border-richblack-800">
      <Accordion open={open}>
        <AccordionHeader
          onClick={handleOpen}
          className={`px-4 py-3 bg-richblack-700 cursor-pointer ${
            isFirst ? "rounded-t-2xl" : ""
          } ${!open && isLast ? "rounded-b-2xl" : ""}`}
        >
          <div className="flex gap-2 w-full justify-between items-center">
            <span>{section.sectionName}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`h-5 w-5 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </AccordionHeader>
        <AccordionBody
          className={`bg-richblack-800 px-4 py-2 ${
            open ? "block" : "hidden"
          } ${isLast ? "rounded-b-2xl" : ""} transition-all`}
        >
          {section?.subSection?.map((subSec, subIndex) => (
            <div
              key={subIndex}
              className="flex gap-2 ml-5 my-3 items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <VscDebugBreakpointLog />
                {subSec?.title}
              </div>
            </div>
          ))}
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default CourseContentNestedView;
