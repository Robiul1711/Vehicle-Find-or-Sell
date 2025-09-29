import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import React, { use } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import NotificationDropdown from "@/shared/navbar/NotificationDropdown";
import UserDropdown from "@/shared/navbar/UserDropdown";

const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex items-center gap-5 justify-between w-full py-3 md:py-6 px-4 sm:px-8 bg-white ">
      <div className="flex items-center gap-4">
        <span
          onClick={() => setOpen(!open)}
          className="xlg:hidden block cursor-pointer"
        >
          <GiHamburgerMenu color="black" size={26} />
        </span>
        <div className="flex items-center gap-4">
          <p className=" text-black sm:text-2xl md:text-3xl font-bold">Admin Header</p>
        </div>
      </div>

      <div className="flex items-center md:gap-4 gap-2">
    <NotificationDropdown />
        <UserDropdown />
      </div>
    </div>
  );
};

export default CommonNavbar;
