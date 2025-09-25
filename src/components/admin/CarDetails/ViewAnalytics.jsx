"use client";
import React from "react";
import { ArrowLeft, Eye, Heart, MessageCircle, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Link, useParams } from "react-router-dom";
import { FavouriteIcon, LoveIcon, Message2Icon, ViewIcon } from "@/components/common/SVGicons/DashboardIcon";

const ViewAnalytics = () => {
  const {id}=useParams()
  // Chart data
  const chartData = [
    { period: "1 Sep-5 Sep", views: 120 },
    { period: "6 Sep-10 Sep", views: 180 },
    { period: "11 Sep-15 Sep", views: 420 },
    { period: "16 Sep-20 Sep", views: 280 },
    { period: "21 Sep-25 Sep", views: 520 },
    { period: "26 Sep-30 Sep", views: 680 },
    { period: "1 Oct-5 Oct", views: 180 },
    { period: "6 Oct-10 Oct", views: 480 },
  ];

  // Custom Y-axis labels
  const formatYAxis = (value) => {
    if (value <= 100) return "0-100";
    if (value <= 200) return "100-200";
    if (value <= 300) return "200-300";
    if (value <= 400) return "300-400";
    if (value <= 500) return "400-500";
    if (value <= 600) return "500-600";
    if (value <= 700) return "600-700";
    if (value <= 800) return "700-800";
    return value;
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <Link to={`/dashboard/car-details/${id}`} className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Back to Details</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ViewIcon />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">860</div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <LoveIcon />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">10</div>
          <div className="text-sm text-gray-600">Total Favorites</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Message2Icon />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">04</div>
          <div className="text-sm text-gray-600">Total Messages</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-1">Total Views</h2>
        <p className="text-sm text-gray-500 mb-4">
          Showing total views over time periods
        </p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              {/* X-axis showing periods */}
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              {/* Y-axis showing ranges */}
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
              />

              <Tooltip
                contentStyle={{
                  background: "white",

                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
              />

              <Area
                dataKey="views"
                type="natural"
                fill="#F88E08"
                fillOpacity={0.1}
                stroke="orange"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ViewAnalytics;
