import { Label } from "@/components/ui/label";
import { ImageProvider } from "@/utils/ImageProvider";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const FinancingSimulator = ({ data }) => {
  const section = data?.sections?.find(
    (s) => s.section_id === "financing-simulator"
  );
  const fields = section?.extra_data?.fields || [
    "Car Price",
    "Down Payment",
    "Loan Term",
    "Annual Interest Rate (%)",
  ];
  const ctaLabel = section?.extra_data?.cta_label || "Calculate";

  const [results, setResults] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: "",
      down_payment: "",
      duration: "",
      interest: "",
    }
  });

  const watchPrice = watch("price");
  const watchDownPayment = watch("down_payment");
  const watchDuration = watch("duration");
  const watchInterest = watch("interest");

  // Calculate live when any field changes
  useEffect(() => {
    const price = parseFloat(watchPrice);
    const downPayment = parseFloat(watchDownPayment) || 0;
    const duration = parseInt(watchDuration);
    const interestRate = parseFloat(watchInterest);

    if (!isNaN(price) && !isNaN(duration) && !isNaN(interestRate) && price > 0 && duration > 0) {
      const loanAmount = Math.max(0, price - downPayment);
      
      let monthlyPayment = 0;
      let totalToPay = 0;
      let totalInterest = 0;

      if (interestRate === 0) {
        monthlyPayment = loanAmount / duration;
        totalToPay = loanAmount;
        totalInterest = 0;
      } else {
        // Standard amortization formula
        const monthlyRate = (interestRate / 100) / 12;
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, duration)) / (Math.pow(1 + monthlyRate, duration) - 1);
        
        if (isNaN(monthlyPayment) || !isFinite(monthlyPayment)) {
          // Fallback to simple interest
          totalInterest = loanAmount * (interestRate / 100) * (duration / 12);
          totalToPay = loanAmount + totalInterest;
          monthlyPayment = totalToPay / duration;
        } else {
          totalToPay = monthlyPayment * duration;
          totalInterest = totalToPay - loanAmount;
        }
      }

      setResults({
        loanAmount: loanAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalToPay: totalToPay.toFixed(2),
        monthlyPayment: monthlyPayment.toFixed(2),
      });
    } else {
      setResults(null);
    }
  }, [watchPrice, watchDownPayment, watchDuration, watchInterest]);

  const resetForm = () => {
    reset();
    setResults(null);
  };

  const onSubmit = (formData) => {
    // Already calculated live
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
        {/* Left Side: Description */}
        <div className="space-y-4 lg:space-y-10">
          <p className="lg:text-3xl font-bold">
            {section?.title || "Financing Simulator"}
          </p>
          <p className="lg:text-xl text-gray-600">
            {section?.description ||
              "Estimate your monthly payments and total loan cost in seconds."}
          </p>
        </div>

        {/* Right Side: Inputs */}
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-lg">{fields[0] || "Car Price"}</Label>
              <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                <input
                  type="number"
                  step="any"
                  {...register("price")}
                  placeholder="Enter total vehicle price"
                  className="w-full border-none outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg">{fields[1] || "Down Payment"}</Label>
              <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                <input
                  type="number"
                  step="any"
                  {...register("down_payment")}
                  placeholder="Enter initial payment"
                  className="w-full border-none outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg">{fields[2] || "Loan Term"}</Label>
              <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                <input
                  type="number"
                  {...register("duration")}
                  placeholder="Enter duration in months"
                  className="w-full border-none outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg">
                {fields[3] || "Annual Interest Rate (%)"}
              </Label>
              <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                <input
                  type="number"
                  step="0.01"
                  {...register("interest")}
                  placeholder="Enter interest rate"
                  className="w-full border-none outline-none bg-transparent"
                />
              </div>
            </div>

            {results && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button type="button" className="w-full bg-[#EBF4FF] text-black py-3 rounded-[10px]">
                  Total Interest {results?.totalInterest} €
                </button>
                <button type="button" className="w-full bg-[#EBF4FF] text-black py-3 rounded-[10px]">
                  Total to Pay {results?.totalToPay} €
                </button>
                <button type="button" className="w-full bg-[#EBF4FF] text-black py-3 rounded-[10px]">
                  Monthly Payment {results?.monthlyPayment} €
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-5">
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-[#f8313a] text-white py-3 rounded-[10px] font-semibold"
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-full bg-[#002855] text-white py-3 rounded-[10px] font-semibold"
              >
                {ctaLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinancingSimulator;
