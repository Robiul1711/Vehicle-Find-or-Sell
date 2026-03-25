import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { matchPath } from "react-router-dom";
import logo from "@/assets/images/logo1.png";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";

const SideBar = ({ sidebar, open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeParentIndex, setActiveParentIndex] = useState(null);

  useEffect(() => {
    sidebar.forEach((item, index) => {
      if (item.sublink) {
        const activeSub = item.sublink.find(
          (sub) => sub.path === location.pathname
        );
        if (activeSub) {
          setActiveParentIndex(index);
        }
      }
    });
  }, [location.pathname, sidebar]);

  const isActive = (paths) => {
    if (!paths) return false;
    const pathArray = Array.isArray(paths) ? paths : [paths];

    return pathArray.some((p) =>
      matchPath({ path: p, end: true }, location.pathname)
    );
  };

  const isParentActive = (item) => {
    if (!item.sublink) return isActive(item.path);
    return item.sublink.some((sub) => isActive(sub.path));
  };

  const toggleSubmenu = (index) => {
    setActiveParentIndex((prev) => (prev === index ? null : index));
  };

  // ✅ Handle Logout with Confirmation
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // red confirm
      cancelButtonColor: "#3085d6", // blue cancel
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
      }
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } xlg:hidden z-50`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`h-full py-6 transition-all duration-300 ease-in-out overflow-x-hidden ${
          open
            ? "w-[300px] left-0 shadow-lg"
            : "xlg:w-[85px] w-[300px] -left-full xlg:left-0"
        } bg-white backdrop-blur-md flex flex-col gap-8 shadow-md xlg:static fixed z-[220]`}
      >
        {/* Logo */}
<div
  className={`${
    open ? "px-8" : "flex justify-center px-2"
  }`}
>
  <Link
    to={"/"}
    className="inline-flex items-center cursor-pointer"
  >
    <img src={logo} alt="logo" className="min-w-[40px]" />
  </Link>
</div>

        {/* Navigation */}
        <div className={`flex flex-col gap-1 ${open ? "px-4" : "px-2"}`}>
          {sidebar?.map((item, index) => {
            const parentActive = isParentActive(item);
            return !item?.sublink ? (
              <Link
                key={index}
                to={item?.path}
                onClick={() => {
                  setActiveParentIndex(null);
                  if (window.innerWidth < 1024) setOpen(false);
                }}
                className={`flex items-center gap-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  open ? "px-4 py-3 xl:px-6" : "justify-center py-4"
                } ${
                  isActive(item?.activePaths)
                    ? "bg-custom-primary text-[#ffff]"
                    : "text-[#7F879E] hover:bg-custom-primary hover:text-[#ffffff]"
                }`}
              >
                <span className="text-xl shrink-0">{item?.icon}</span>
                {open && (
                  <span className="whitespace-nowrap">{item?.text}</span>
                )}
              </Link>
            ) : (
              <div className="relative" key={index}>
                {/* Parent link */}
                <div
                  className={`flex items-center rounded-lg transition-all duration-200 ${
                    open
                      ? "justify-between px-4 py-3 xl:px-6"
                      : "justify-center py-4"
                  } ${
                    parentActive
                      ? "bg-[#253E8E] text-white"
                      : "text-gray-700 hover:bg-cus hover:text-[#253E8E]"
                  }`}
                  onClick={() => open && toggleSubmenu(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl shrink-0">{item?.icon}</span>
                    {open && (
                      <p className="font-medium whitespace-nowrap">
                        {item?.text}
                      </p>
                    )}
                  </div>
                  {open && (
                    <span
                      className={`transform transition-transform duration-300 ${
                        activeParentIndex === index ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <MdKeyboardArrowDown size={20} />
                    </span>
                  )}
                </div>

                {/* Sublinks dropdown */}
                {open && (
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden px-4 bg-white rounded-lg ${
                      activeParentIndex === index
                        ? "max-h-[500px] py-4 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2"
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      {item?.sublink?.map((value, subIndex) => (
                        <Link
                          key={subIndex}
                          to={value?.path}
                          className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                            isActive(item?.activePaths)
                              ? "text-black font-medium bg-[#F0F4FF]"
                              : "text-[#5A5C5F] font-normal hover:bg-[#F0F4FF]"
                          }`}
                          onClick={() => {
                            if (window.innerWidth < 1024) setOpen(false);
                          }}
                        >
                          {value?.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Logout */}
  <div
  className={`mt-auto  ${
    open ? "px-4 py-3 xl:px-8" : "py-4 text-center"
  }`}
>
  <div
    onClick={handleLogout}
    className="inline-flex items-center gap-3 cursor-pointer transition rounded-lg hover:text-red-500"
  >
    <span className="shrink-0">
      <IoLogOutOutline size={24} />
    </span>
    {open && <p className="font-medium whitespace-nowrap">Log Out</p>}
  </div>
</div>
      </div>
    </>
  );
};

export default SideBar;
