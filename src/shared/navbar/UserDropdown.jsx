import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import profile from "@/assets/images/dummy.png";
const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const axiosSecure = useAxiosSecure();
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

  // ✅ Fetch user details
  const { data: userDetails } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/profile`);
      return response.data;
    },
  });

  // ✅ Logout Mutation
  const LogoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosSecure.post(`/logout`);
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        timer: 2000,
        showConfirmButton: false,
      });
      localStorage.removeItem("user");
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error?.message || "Something went wrong!",
      });
    },
  });

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
        LogoutMutation.mutate();
      }
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-white text-lg"
      >
     <img className="w-10 h-10 rounded-full" src={profile} alt="image" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-xl border  z-50 text-gray-800">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold">
              {userDetails?.userdata?.name || "Username"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {userDetails?.userdata?.email}
            </p>
          </div>
          <div className="py-1">
            <Link
              to={`/dashboard`}
              className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100"
            >
              <MdDashboard className="mr-2" /> Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;