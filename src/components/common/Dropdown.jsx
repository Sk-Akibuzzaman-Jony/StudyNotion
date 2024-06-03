import React, { useEffect, useState, Fragment } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";
import { setLoading } from "../../slices/loadingSlice";
import { useDispatch } from "react-redux";

const Dropdown = ({ link }) => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(setLoading(true));
      const result = await fetchCourseCategories();
      setCategories(result);
      dispatch(setLoading(false));
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
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
        <Menu.Items className="divide-y divide-gray-20 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-black">
          <div className="px-2 0">
            {categories.length ? (
              categories.map((category, index) => (
                <Fragment key={index}>
                  {index > 0 && <div className="border-t border-gray-200 my-2" />}
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`${link.path}/${category.name}`}
                        className={`block py-2 ${active ? 'bg-gray-100' : ''}`}
                      >
                        {category.name}
                      </Link>
                    )}
                  </Menu.Item>
                </Fragment>
              ))
            ) : (
              <div>No categories available</div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
