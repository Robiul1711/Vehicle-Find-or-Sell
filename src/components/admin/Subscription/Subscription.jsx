import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

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
  const [isMonthly, setIsMonthly] = useState(true); // true = Vehicle, false = Spare Parts
  const monthlyButtonRef = useRef(null);
  const yearlyButtonRef = useRef(null);
  const [activeButtonLeft, setActiveButtonLeft] = useState(0);
  const [activeButtonWidth, setActiveButtonWidth] = useState(0);

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

  // Vehicle Packages (4 plans)
  const vehicleTiers = [
    {
      name: "Premium Ad (single)",
      price: "$19",
      features: ["5 Projects", "10 GB Storage", "Basic Analytics", "Community Support", "Custom Domains"],
      buttonText: "Purchase Plan",
      isPopular: false,
    },
    {
      name: "Pack of 15 Ads",
      price: "$49",
      features: ["Unlimited Projects", "50 GB Storage", "Advanced Analytics", "Priority Email Support", "Custom Domains", "Team Collaboration"],
      buttonText: "Purchase Plan",
      isPopular: true,
    },
    {
      name: "Pack of 30 Ads",
      price: "$99",
      features: ["All Pro Features", "Unlimited Storage", "Real-time Analytics", "24/7 Phone Support", "Dedicated Account Manager", "SAML/SSO Integration"],
      buttonText: "Purchase Plan",
      isPopular: false,
    },
    {
      name: "Pack of 50 Ads",
      price: "$149",
      features: ["All Pro Features", "Unlimited Storage", "Real-time Analytics", "24/7 Phone Support", "Dedicated Account Manager", "SAML/SSO Integration"],
      buttonText: "Purchase Plan",
      isPopular: false,
    },
  ];

  // Spare Parts Packages (different data)
  const sparePartsTiers = [
    {
      name: "Spare Parts Basic",
      price: "$9",
      features: ["1 Spare Part Ad", "Basic Listing", "7 Days Visibility"],
      buttonText: "Purchase Spare Plan",
      isPopular: true,
    },
  ];

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
  const displayedTiers = isMonthly ? vehicleTiers : sparePartsTiers;

  return (
    <div className="w-full relative overflow-hidden">
      <div className="relative z-10 min-h-screen">
        <div className="w-full">
    <div className="text-center sm:text-left max-w-3xl mx-auto sm:mx-0 px-4 sm:px-0">
  <h1 className="text-2xl sm:text-4xl xl:text-5xl font-extrabold text-gray-900 tracking-tight leading-snug sm:leading-tight">
    Choose Your Professional Subscription Plan
  </h1>
  <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
    Access advanced tools, statistics, and premium ad packs to grow your visibility and sales.
  </p>
</div>

          {/* Toggle Buttons */}
          <div className=" mt-5 md:mt-10 flex justify-center">
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
            className="mt-8 md:mt-16 grid grid-cols-1 gap-4 xl:gap-8 md:grid-cols-2 xlg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedTiers.map((tier) => (
              <motion.div
                key={tier.name}
                className={`relative flex flex-col p-8 rounded-xl border transition-all duration-300 ${
                  tier.isPopular ? "border-[#01244B] bg-white" : "border-gray-200 bg-white/90"
                }`}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.05)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-4 flex justify-between items-baseline">
                  <div>
                    <span className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900">
                      <AnimatedPrice price={tier.price} />
                    </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">/ad</span>
                  </div>
                  <p className="xl:text-2xl text-[#F88E08]">Excl. VAT</p>
                </div>

                <ul role="list" className="mt-5 md:mt-8 space-y-3 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <IoIosCheckmarkCircleOutline className="w-5 h-5 text-[#01244B]" />
                      <p className="ml-2 text-sm sm:text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <motion.button
                    className="w-full py-2 px-4 rounded-md text-sm sm:text-base font-medium text-white bg-[#01244B] border border-[#01244B] hover:bg-[#001E3C] transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tier.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
