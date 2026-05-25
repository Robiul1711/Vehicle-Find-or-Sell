import { useApiQuery } from "@/hooks/useApiQuery";
import React from "react";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircleOutline, IoIosStats } from "react-icons/io";

const Subscription = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["myplan"],
    url: "/subscription/myplan/",
    secure: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F88E08]"></div>
      </div>
    );
  }

  const plans = Array.isArray(data) ? data : [];

  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600 mb-4">
          You don't have any active subscription plans.
        </p>
        <Link
          to="/dashboard/subscription"
          className="bg-custom-primary text-white px-6 py-2 rounded-md hover:bg-custom-primary/90 transition inline-block text-sm"
        >
          View & Purchase Plans
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {plans.map((myPlan) => (
        <div
          key={myPlan.id}
          className="bg-white rounded-lg border border-[#F88E08] p-6 relative overflow-hidden"
        >
          {/* Current Plan Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F88E08] text-white">
              {myPlan.plan.is_recommended ? "Recommended Plan" : "Current Plan"}
            </span>
          </div>

          <div className="pt-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 border-b border-gray-100 pb-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {myPlan.plan.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2 max-w-md italic">
                  {myPlan.plan.description}
                </p>
                <div className="text-[#F88E08] text-xl font-bold">
                  €{myPlan.plan.price}{" "}
                  <span className="text-sm text-gray-400 font-normal">
                    {" "}
                    (VAT: €{myPlan.plan.vat})
                  </span>
                  <span className="text-sm text-gray-500 font-normal ml-1">
                    / {myPlan.plan.interval_display}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${myPlan.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {myPlan.is_active ? "Active" : "Inactive"}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  ID: {myPlan.stripe_subscription_id}
                </span>
              </div>
            </div>

            {/* Usage Stats (NEW) */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-orange-50 p-4 rounded-lg border border-orange-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full text-[#F88E08] shadow-sm">
                  <IoIosStats size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    Ads Usage
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {myPlan.ads_used} / {myPlan.plan.ad_limit}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      Used
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center border-l border-orange-200 pl-4">
                <p className="text-xs text-gray-500 uppercase font-bold">
                  Remaining
                </p>
                <p className="text-lg font-bold text-green-600">
                  {myPlan.ads_remaining} Ads
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm py-1 border-b border-gray-50">
                  <span className="font-medium text-gray-600">Start Date</span>
                  <span className="text-gray-900 bg-gray-50 px-2 py-0.5 rounded">
                    {new Date(myPlan.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm py-1 border-b border-gray-50">
                  <span className="font-medium text-gray-600">End Date</span>
                  <span className="text-gray-900 bg-gray-50 px-2 py-0.5 rounded">
                    {new Date(myPlan.end_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm py-1 border-b border-gray-50">
                  <span className="font-medium text-gray-600">
                    Package Type
                  </span>
                  <span className="text-gray-900 capitalize">
                    {myPlan.plan.plan_type_display} (
                    {myPlan.plan.user_type_display})
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Included Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {myPlan.plan.features
                    ?.filter((f) => f.is_enabled)
                    .map((featureObj) => (
                      <div
                        key={featureObj.id}
                        className="flex items-start text-xs text-gray-600 group"
                      >
                        <IoIosCheckmarkCircleOutline className="w-4 h-4 text-[#F88E08] mr-2 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="leading-tight">
                          {featureObj.limit_value ? (
                            <span className="font-bold text-gray-900">
                              {featureObj.limit_value}{" "}
                            </span>
                          ) : (
                            ""
                          )}
                          {featureObj.feature?.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {myPlan.ads_remaining <= 0 && (
              <div className="mt-6 flex justify-end">
                <Link
                  to="/dashboard/subscription"
                  className="bg-custom-primary text-white px-5 py-2 rounded-md hover:bg-custom-primary/90 transition-all text-sm font-medium shadow-sm hover:shadow-md active:scale-95"
                >
                  Upgrade & Manage
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subscription;
