import {
  BoostAddsIcon,
  State1Icon,
  State2Icon,
  State3Icon,
  State4Icon,
} from "@/components/common/SVGicons/DashboardIcon";
import { useApiQuery } from "@/hooks/useApiQuery";
import { BanknoteX, Calendar, CirclePause } from "lucide-react";
import React from "react";

const DashStates = () => {
    const { data, isLoading } = useApiQuery({
      queryKey: ["dashboardStats"],
      url: "/ads/dashboard/stats/",
      secure: true,
    });
  const stats = [
    {
      id: 1,
      title: "Total Listing",
      value: data?.data?.total_listings || "00",
      icon: State1Icon,
      iconBg: "bg-[#9FCC3B1A]",
      iconColor: "text-[#9FCC3B]",
    },
    {
      id: 2,
      title: "Active Listing",
      value: data?.data?.active_listings || "00",
      icon: State2Icon,
      iconBg: "bg-[#9FCC3B1A]",
      iconColor: "text-[#9FCC3B]",
    },
    {
      id: 3,
      title: "Favorites Saved",
      value: data?.data?.favourites_saved || "00",
      icon: State3Icon,
      iconBg: "bg-[#9FCC3B1A]",
      iconColor: "text-[#9FCC3B]",
    },
    {
      id: 4,
      title: "Pending Ads",
      value: data?.data?.pending_ads || "00",
      icon: State4Icon,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 5,
      title: "Scheduled Ads",
      value: data?.data?.scheduled_ads || "00",
      icon:  Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 6,
      title: "Boosted Ads",
      value: data?.data?.boosted_ads || "00",
      icon:  BoostAddsIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 7,
      title: "Paused Ads",
      value: data?.data?.paused_ads || "00",
      icon:  CirclePause,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: 8,
      title: "Declined Ads",
      value: data?.data?.declined_ads || "00",
      icon:  BanknoteX,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-lg p-5 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${stat.iconBg} p-2 md:p-3 rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base font-medium">
                    {stat.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashStates;
