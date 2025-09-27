import {
  BoostAddsIcon,
  DashboardIcon,
  FavouriteIcon,
  MessageIcon,
  MyAddsIcon,
  SettingIcon,
  SubscriptionIcon,
  SupportIcon,
} from "@/components/common/SVGicons/DashboardIcon";

import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SideBar";

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const [Open, setOpen] = useState(false);

  const sideBar = [
    {
      id: 1,
      icon: <DashboardIcon className=" hover:text-red-500" />,
      text: "Dashboard",
      path: "/dashboard",
      activePaths: ["/dashboard"],
      sublink: false,
    },
    {
      id: 2,
      icon: <MyAddsIcon className=" hover:text-primaryColor" />,
      text: "My Ads",
      path: "/dashboard/my-adds",
      activePaths: ["/dashboard/my-adds", "/dashboard/car-details/:id", "/dashboard/view-analytics/:id", "/dashboard/create-ads"],
      sublink: false,
    },
    {
      id: 3,
      icon: <BoostAddsIcon className=" hover:text-primaryColor" />,
      text: "Boost Ads ",
      path: "/dashboard/boost-ads",
      activePaths: ["/dashboard/boost-ads", "/dashboard/boost-your-ad-visibility/:id"],
      sublink: false,
    },
    {
      id: 4,
      icon: <FavouriteIcon className=" hover:text-primaryColor" />,
      text: "My Favorites",
      path: "/dashboard/my-favorites",
      activePaths: ["/dashboard/my-favorites"],
      sublink: false,
    },
    {
      id: 5,
      icon: <MessageIcon className=" hover:text-primaryColor" />,
      text: "Messages",
      path: "/dashboard/message",
      activePaths: ["/dashboard/message"],
      sublink: false,
    },
    {
      id: 6,
      icon: <SubscriptionIcon className=" hover:text-primaryColor" />,
      text: "Subscription",
      path: "/dashboard/subscription",
      activePaths: ["/dashboard/subscription"],
      sublink: false,
    },
    {
      id: 7,
      icon: <SupportIcon className=" hover:text-primaryColor" />,
      text: "Support & Help",
      path: "/dashboard/support-and-help",
      activePaths: ["/dashboard/support-and-help"],
      sublink: false,
    },
    {
      id: 8,
      icon: <SettingIcon className=" hover:text-primaryColor" />,
      text: "Settings",
      path: "/dashboard/settings",
      activePaths: ["/dashboard/settings"],
      sublink: false,
    },
  ];
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <>
      <ScrollRestoration />
      <div className="flex  h-screen min-h-screen w-full">
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1 bg-dark bg-[#F8F8F8]   flex flex-col overflow-auto custom-scrollbar">
          <div className=" flex flex-col  ">
            <CommonNavbar open={Open} setOpen={setOpen} />
            <div className="p-4 sm:p-6 md:p-9  ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
