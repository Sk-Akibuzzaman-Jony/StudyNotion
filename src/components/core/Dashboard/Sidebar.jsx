import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { FiLogOut } from "react-icons/fi";
import LogoutPopup from "../../common/LogoutPopup";

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const [popupShow, setPopupShow] = useState(false);
  return (
    <div className="flex">
      <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc[100vh-3.5rem]] bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return <SidebarLink key={link.id} link={link} />;
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

        <div className="flex flex-col">
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />
          <button
            className="pl-5 pt-2 pb-2 flex text-richblack-300 gap-2 font-bold items-center"
            onClick={() => setPopupShow(true)}
          >
            <span>
              <FiLogOut />
            </span>
            Logout
          </button>
        </div>
      </div>
      {popupShow && (<LogoutPopup setPopupShow={setPopupShow}/>)}
    </div>
  );
};

export default Sidebar;
