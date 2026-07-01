import React, { useState } from "react";
import { ArrowLeft, Sparkles, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";

const BoostYourAdVisibility = () => {
  const [selectedBoosts, setSelectedBoosts] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vehicleType = queryParams.get("type");

  const { data: boostOptions = [], isLoading } = useApiQuery({
    queryKey: ["boost-packages"],
    url: `/subscription/boost-packages/`,
    secure: true,
  });

  const { mutate, isPending } = useApiMutation({
    url: "/subscription/boost-purchase/",
    method: "POST",
    secure: true,
    onSuccess: (res) => {
      if (res?.checkout_url) {
        window.location.href = res.checkout_url;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-secondary"></div>
      </div>
    );
  }

  const handleContinue = () => {
    const payload = {
      ad_type: vehicleType,
      ad_id: parseInt(id),
      package_ids: selectedBoosts,
    };
    mutate(payload);
  };

  const toggleBoost = (boostId) => {
    setSelectedBoosts((prev) => {
      if (prev.includes(boostId)) {
        return [];
      } else {
        return [boostId];
      }
    });
  };

  const calculateTotal = () => {
    return selectedBoosts
      .reduce((total, boostId) => {
        const boost = boostOptions.find((b) => b.id === boostId);
        if (boost) {
          const price = parseFloat(
            boost.price.replace("€", "").replace("/ad", ""),
          );
          return total + price;
        }
        return total;
      }, 0)
      .toFixed(2);
  };

  const getBoostIcon = (name = "") => {
    const lower = name.toLowerCase();
    if (lower.includes("premium") || lower.includes("platinum") || lower.includes("gold") || lower.includes("vip")) {
      return <Sparkles className="w-6 h-6 text-custom-secondary" />;
    }
    if (lower.includes("express") || lower.includes("speed") || lower.includes("urgent") || lower.includes("boost")) {
      return <Zap className="w-6 h-6 text-custom-secondary" />;
    }
    if (lower.includes("top") || lower.includes("visibility") || lower.includes("highlight")) {
      return <TrendingUp className="w-6 h-6 text-custom-secondary" />;
    }
    return <ShieldCheck className="w-6 h-6 text-custom-secondary" />;
  };

  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm p-6 md:p-10  mx-auto transition-all duration-300">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
          Boost Your Ad Visibility
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
          Increase your chances of selling faster by choosing from our premium visibility packages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {boostOptions.map((boost) => {
          const isSelected = selectedBoosts.includes(boost.id);
          const priceVal = boost.price.replace("€", "").replace("/ad", "").trim();
          
          return (
            <div
              key={boost.id}
              onClick={() => toggleBoost(boost.id)}
              className={`group relative border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${
                isSelected
                  ? "border-custom-secondary bg-custom-secondary/[0.02] shadow-sm ring-1 ring-custom-secondary/20"
                  : "border-gray-200 bg-white hover:border-custom-primary/30 hover:bg-custom-primary/[0.01]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    isSelected ? "bg-custom-secondary/15" : "bg-gray-100 group-hover:bg-custom-secondary/10"
                  }`}>
                    {getBoostIcon(boost.name)}
                  </div>
                  
                  {/* Selection dot */}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    isSelected
                      ? "border-custom-secondary bg-custom-secondary text-white scale-110"
                      : "border-gray-300 bg-white"
                  }`}>
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-custom-primary transition-colors">
                    {boost.name}
                  </h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-extrabold text-custom-primary">
                      €{priceVal}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">/ ad</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed pt-2">
                    {boost.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom section with buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
        <Link
          to="/dashboard/boost-ads"
          className="flex items-center gap-2 px-5 py-2.5 text-gray-600 hover:text-custom-primary hover:bg-gray-50 rounded-xl transition-all font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </Link>

        <div className="flex items-center gap-6">
          {selectedBoosts.length > 0 && (
            <div className="text-right">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Amount:</p>
              <p className="text-2xl font-black text-custom-primary">
                €{calculateTotal()}
              </p>
            </div>
          )}
          <button
            onClick={handleContinue}
            className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 active:scale-95 text-sm md:text-base ${
              selectedBoosts.length > 0 && !isPending
                ? "bg-custom-primary text-white shadow-md hover:shadow-lg hover:bg-opacity-95"
                : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
            }`}
            disabled={selectedBoosts.length === 0 || isPending}
          >
            {isPending ? "Processing..." : "Continue & Pay"}
          </button>
        </div>
      </div>

      {/* Selection summary details */}
      {selectedBoosts.length > 0 && (
        <div className="mt-8 p-5 bg-custom-primary/5 rounded-2xl border border-custom-primary/10 animate-in fade-in slide-in-from-top-2 duration-300">
          <h4 className="font-bold text-custom-primary mb-3 flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-custom-secondary" />
            <span>Package Summary</span>
          </h4>
          <ul className="text-sm divide-y divide-custom-primary/10">
            {selectedBoosts.map((boostId) => {
              const boost = boostOptions.find((b) => b.id === boostId);
              return (
                <li key={boostId} className="flex justify-between py-2.5 first:pt-0 last:pb-0">
                  <span className="font-semibold text-gray-700">{boost?.name || boost?.title}</span>
                  <span className="font-bold text-custom-primary">€{boost?.price.replace("€", "").replace("/ad", "").trim()}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BoostYourAdVisibility;
