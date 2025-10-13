import React from "react";
import DashBanner from "./DashBanner";
import DashStates from "./DashStates";
import MyRecentListings from "./MyRecentListings";

const Dashboard = () => {
  return (
    <div className="space-y-6 md:space-y-9">
      <DashBanner />
      <DashStates />
      <MyRecentListings />
    </div>
  );
};

export default Dashboard;
