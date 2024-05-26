import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { VscDebugBreakpointLog } from "react-icons/vsc";

function Icon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const CourseContentNestedView = ({ section }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="text-richblack-25 flex justify-between gap-3 font-bold text-lg rounded-2xl border border-richblack-800">
      <Accordion open={open}>
        <AccordionHeader
          onClick={handleOpen}
          className={`px-2 bg-richblack-700 ${
            open ? "rounded-t-2xl" : "rounded-2xl"
          }`}
        >
          <div className="flex gap-2 items-center px-3 w-full justify-between">
            {section.sectionName}
            <Icon open={open} />
          </div>
        </AccordionHeader>
        <AccordionBody className="bg-richblack-800 rounded-b-2xl">
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
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default CourseContentNestedView;
