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

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-orange-600 font-semibold">
            {payload[0].value} views
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50/30 py-6 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to={`/dashboard/car-details/${id}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Details</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Overview</h1>
              <p className="text-gray-600">Track your vehicle's performance and engagement metrics</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <ViewIcon className="size-6 text-orange-600" />
              </div>
              <div className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.4%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">860</div>
            <div className="text-sm text-gray-600 font-medium">Total Views</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center">
                <LoveIcon className="size-5 text-pink-600" />
              </div>
              <div className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.2%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">10</div>
            <div className="text-sm text-gray-600 font-medium">Total Favorites</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Message2Icon className="size-5 text-blue-600" />
              </div>
              <div className="text-gray-600 text-sm font-medium bg-gray-50 px-2 py-1 rounded-full">
                No change
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">04</div>
            <div className="text-sm text-gray-600 font-medium">Total Messages</div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Views Over Time</h2>
              <p className="text-gray-600 text-sm">
                Showing total views across different time periods
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                Overall Growth
              </div>
            </div>
          </div>

          <div className="h-80 lg:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid 
                  vertical={false} 
                  strokeDasharray="3 3" 
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="period"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  tickFormatter={formatYAxis}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  dataKey="views"
                  type="natural"
                  fill="url(#colorViews)"
                  fillOpacity={0.3}
                  stroke="url(#colorStroke)"
                  strokeWidth={3}
                  dot={{ fill: '#f88e08', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#f88e08', stroke: '#fff', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f88e08" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f88e08" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorStroke" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f88e08" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#f88e08" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnalytics;