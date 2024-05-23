import React, { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";

const Dropdown = ({ link }) => {
  const [catagories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await fetchCourseCategories();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="">
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 text-gray-900 shadow-sm hover:bg-gray-50">
          {link.title}
          <IoIosArrowDropdownCircle
            className="-mr-1 mt-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-black">
          <div className="p-5">
            {catagories.length ? (
              catagories.map((catagory, index) => (
                <Menu.Item>
                  <Link to={`${link.path}/${catagory.name}`} key={index}>
                    <p>{catagory.name}</p>
                  </Link>
                </Menu.Item>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
