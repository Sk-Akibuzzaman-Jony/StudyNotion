import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({ link }) => {
  const IconComponent = Icons[link.icon];
  const location = useLocation();
  return (
    <NavLink to={link.path} className={`pl-5 pt-2 pb-2 ${location.pathname == link.path
      ? "bg-yellow-800 text-yellow-50 border-l-2"
      : "text-richblack-300"
      } flex gap-2 font-bold items-center`}>
      {IconComponent && <IconComponent />}
      {link.name}

    </NavLink>
  );
};

export default SidebarLink;
