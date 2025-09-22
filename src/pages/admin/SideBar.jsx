import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";
const SideBar = ({ sidebar, open, setOpen }) => {
  const location = useLocation();
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
    return pathArray.includes(location.pathname);
  };

  const isParentActive = (item) => {
    if (!item.sublink) return isActive(item.path);
    return item.sublink.some((sub) => isActive(sub.path));
  };

  const toggleSubmenu = (index) => {
    setActiveParentIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } xl:hidden z-50`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`h-full py-6 ${
          open
            ? "left-0 top-0 w-[320px] z-[220] shadow-lg bg-[#1F3C37] overflow-y-auto"
            : "-left-full xl:w-[350px] w-[320px]"
        }
        bg-[#ddd] backdrop-blur-md lg:px-8 px-4 flex flex-col gap-8 shadow-md xlg:static fixed transition-all duration-300`}
      >
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex justify-center items-center">
            {/* <img src={} alt="Safe" className="h-24 object-contain" /> */}
            <span>
              <FaReact size={40} color=" black" />
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          {sidebar?.map((item, index) => {
            const parentActive = isParentActive(item);
            return !item?.sublink ? (
              <Link
                key={index}
                to={item?.path}
                onClick={() => {
                  setActiveParentIndex(null);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                  isActive(item?.activePaths)
                    ? "bg-[#FFF] text-[#3F6534]"
                    : "text-[#FFF] hover:bg-[#466b55] hover:text-[#ffffff]"
                }`}
              >
                <span className="text-lg">{item?.icon}</span>
                {item?.text}
              </Link>
            ) : (
              <div className="relative" key={index}>
                {/* Parent link */}
                <div
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer w-full rounded-lg transition-all duration-200 ${
                    parentActive
                      ? "bg-[#253E8E] text-white"
                      : "text-gray-700 hover:bg-[#E3ECFF] hover:text-[#253E8E]"
                  }`}
                  onClick={() => toggleSubmenu(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item?.icon}</span>
                    <p className="font-medium">{item?.text}</p>
                  </div>
                  <span
                    className={`transform transition-transform duration-300 ${
                      activeParentIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <MdKeyboardArrowDown size={20} />
                  </span>
                </div>

                {/* Sublinks dropdown */}
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
                        onClick={() => setOpen(false)}
                      >
                        {value?.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Logout */}
          <div className="flex absolute bottom-6 w-[80%] items-center gap-3  cursor-pointer  transition  rounded-lg px-4 py-2">
            <span>
              <IoLogOutOutline color="black" />
            </span>
            <p className="font-medium ">Log Out</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
