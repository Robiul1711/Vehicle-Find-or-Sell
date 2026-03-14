import { useAuth } from "@/hooks/useAuth";
import React, { useState, useEffect, useRef } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import profile from "@/assets/images/dummy.png";


const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
  // console.log(user?.profile?.profile_image)
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-white text-lg"
      >
        <img
          className="w-10 h-10 rounded-full border-2 border-custom-primary object-cover"
          src={
            user?.profile?.profile_image
              ?  user?.profile?.profile_image
              : profile
          }
          alt="user profile"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 text-gray-800 overflow-hidden transform origin-top-right transition-all">
          <div className="px-4 py-4 bg-gray-50/50 border-b border-gray-100">
            <p className="font-bold text-gray-900 truncate">
              {user?.profile?.first_name} {user?.profile?.last_name}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {user?.profile?.user?.email}
            </p>
            <p className="text-xs text-gray-500 font-bold mt-0.5">
              {user?.profile?.user?.account_type}
            </p>
          </div>

          <div className="py-2">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-custom-primary/5 hover:text-custom-primary transition-colors"
            >
              <MdDashboard className="mr-3 text-lg text-gray-400" /> Dashboard
            </Link>

            <div className="my-1 border-t border-gray-100"></div>

            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="mr-3 text-lg" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
