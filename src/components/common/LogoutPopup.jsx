import React from "react";
import Button from "../core/HomePage/Button";
import { signOut } from "../../services/operations/authApi";
import { useNavigate } from 'react-router-dom';

const LogoutPopup = ({setPopupShow}) => {
  const navigate = useNavigate();
  return (
    <div class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
      <div
        aria-hidden="true"
        class="fixed inset-0 w-full h-full bg-black/50 backdrop-filter backdrop-blur-lg cursor-pointer"
      ></div>

      <div class="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
        <div class="w-full py-2 bg-richblack-700 cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
          <div class="space-y-2 p-2 text-richblack-50">
            <div class="p-4 space-y-2 text-center ">
              <h2
                class="text-xl font-bold tracking-tight"
                id="page-action.heading"
              >
                Logout ?
              </h2>

              <p class="text-gray-500">
                Are you sure you would like to logout?
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <div
              aria-hidden="true"
              class="border-t dark:border-richblack-500 px-2"
            ></div>

            <div class="px-6 py-2">
              <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                <button onClick={()=>setPopupShow(false)}>
                  <Button>Go Back</Button>
                </button>
                <button onClick={signOut(navigate)}>
                  <Button active={true}>Logout</Button>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
