import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useAuth } from "@/hooks/useAuth";

const AnimatedPrice = ({ price }) => {
  return (
    <motion.span
      className="inline-block"
      key={price}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {price}
    </motion.span>
  );
};

const Subscription = () => {
  const {user} = useAuth();
  console.log(user)
  const [isMonthly, setIsMonthly] = useState(true); // true = Vehicle, false = Spare Parts
  const monthlyButtonRef = useRef(null);
  const yearlyButtonRef = useRef(null);
  const [activeButtonLeft, setActiveButtonLeft] = useState(0);
  const [activeButtonWidth, setActiveButtonWidth] = useState(0);
  const [loadingPlanId, setLoadingPlanId] = useState(null);

  // Fetch all available plans
  const { data, isLoading, refetch } = useApiQuery({
    queryKey: ["subscription"],
    url: "/subscription/plans/",
    secure: true,
    params: {
      package_type: isMonthly ? "vehicle" : "parts",
    },
  });

  // Fetch current active plan
  const { data: myPlanData } = useApiQuery({
    queryKey: ["myplan"],
    url: "/subscription/myplan/",
    secure: true,
  });

  // Get currently active plan IDs
  const activePlanIds = Array.isArray(myPlanData)
    ? myPlanData.filter((p) => p.is_active).map((p) => p.plan.id)
    : [];

  // Subscribe mutation (for new users without a plan)
  const { mutate: subscribe, isPending } = useApiMutation({
    url: "/subscription/subscribe/",
    method: "POST",
    secure: true,
    onSuccess: (response) => {
      if (response?.checkout_url) {
        window.location.href = response.checkout_url;
      }
    },
    onError: () => {
    
      setLoadingPlanId(null);
    },
  });

  const handlePurchase = (planId) => {
    setLoadingPlanId(planId);
    subscribe({ plan_id: planId });
  };

  useEffect(() => {
    const updateButtonMetrics = () => {
      if (monthlyButtonRef.current && yearlyButtonRef.current) {
        if (isMonthly) {
          setActiveButtonLeft(monthlyButtonRef.current.offsetLeft);
          setActiveButtonWidth(monthlyButtonRef.current.offsetWidth);
        } else {
          setActiveButtonLeft(yearlyButtonRef.current.offsetLeft);
          setActiveButtonWidth(yearlyButtonRef.current.offsetWidth);
        }
      }
    };
    updateButtonMetrics();
    window.addEventListener("resize", updateButtonMetrics);
    return () => {
      window.removeEventListener("resize", updateButtonMetrics);
    };
  }, [isMonthly]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // Switch data based on tab
  const displayedTiers = Array.isArray(data) ? data : [];

  const isButtonLoading = (tierId) =>
    isPending && loadingPlanId === tierId;

  return (
    <div className="w-full relative overflow-hidden">
      <div className="relative z-10">
        <div className="w-full">
          <div className="text-center sm:text-left ">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-snug sm:leading-tight">
              Choose Your <span className="capitalize">{user?.profile?.user?.account_type}</span> {isMonthly ? "Vehicle" : "Spare Parts"} Subscription Plan
            </h1>
            <p className="mt-2 text-base sm:text-lg text-gray-600 leading-relaxed">
              Access advanced tools, statistics, and premium ad packs to grow
              your visibility and sales.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className=" mt-5 flex justify-center">
            <div className="relative flex items-center p-1 rounded-lg border border-gray-300 bg-[#E6EAEE] backdrop-blur-md">
              <button
                ref={monthlyButtonRef}
                onClick={() => setIsMonthly(true)}
                className={`relative z-10 py-2 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isMonthly ? "text-white" : "text-gray-600"
                }`}
              >
                Vehicle Packages
              </button>
              <button
                ref={yearlyButtonRef}
                onClick={() => setIsMonthly(false)}
                className={`relative z-10 py-2 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  !isMonthly ? "text-white" : "text-gray-600"
                }`}
              >
                Spare Parts Packages
              </button>
              {activeButtonWidth > 0 && (
                <motion.div
                  className="absolute inset-y-1 rounded-md"
                  style={{ background: "#01244B" }}
                  initial={false}
                  animate={{ left: activeButtonLeft, width: activeButtonWidth }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <motion.div
            className="mt-8 grid grid-cols-1 gap-4 xl:gap-8 md:grid-cols-2 xlg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01244B]"></div>
              </div>
            ) : (
              displayedTiers.map((tier) => {
                const isCurrentPlan = activePlanIds.includes(tier.id);

                return (
                  <motion.div
                    key={tier.id}
                    className={`relative flex flex-col p-8 rounded-xl border transition-all duration-300 ${
                      isCurrentPlan
                        ? "border-[#F88E08] bg-orange-50/50 ring-2 ring-[#F88E08]/30"
                        : tier.is_popular
                        ? "border-[#01244B] bg-white"
                        : "border-gray-200 bg-white/90"
                    }`}
                    variants={cardVariants}
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 25px 50px -12px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.05)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Current Plan Badge */}
                    {isCurrentPlan && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-bold bg-[#F88E08] text-white shadow-md whitespace-nowrap">
                          ✓ Current Plan
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-start">
                      <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                        {tier.name}
                      </h3>
                      {tier.is_recommended && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                          Recommended
                        </span>
                      )}
                    </div>
                    {tier.description && (
                      <p className="mt-2 text-sm text-gray-500">
                        {tier.description}
                      </p>
                    )}
                    <div className="mt-4 flex justify-between items-baseline">
                      <div>
                        <span className="text-4xl font-extrabold text-gray-900">
                          <AnimatedPrice price={`€ ${tier.price}`} />
                        </span>
                      </div>
                      <p className="xl:text-2xl text-[#F88E08]">Excl. VAT</p>
                    </div>

                    <ul role="list" className="mt-5 md:mt-8 space-y-3 flex-grow">
                      {tier.features
                        ?.filter((f) => f.is_enabled)
                        .map((featureObj) => (
                          <li key={featureObj.id} className="flex items-start">
                            <IoIosCheckmarkCircleOutline className="w-5 h-5 mt-0.5 text-[#01244B] shrink-0" />
                            <p className="ml-2 text-sm sm:text-base text-gray-700">
                              {featureObj.limit_value
                                ? `${featureObj.limit_value} `
                                : ""}
                              {featureObj.feature?.name}
                            </p>
                          </li>
                        ))}
                    </ul>

                    <div className="mt-8">
                      <motion.button
                        onClick={() => handlePurchase(tier.id)}
                        disabled={isButtonLoading(tier.id)}
                        className="w-full h-10 py-2 px-4 rounded-md text-sm sm:text-base font-medium transition-all duration-300 flex justify-center items-center text-white bg-[#01244B] border border-[#01244B] hover:bg-[#001E3C] disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={
                          !isButtonLoading(tier.id)
                            ? { scale: 1.02 }
                            : {}
                        }
                        whileTap={
                          !isButtonLoading(tier.id)
                            ? { scale: 0.98 }
                            : {}
                        }
                      >
                        {isButtonLoading(tier.id) ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          "Purchase Plan"
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
