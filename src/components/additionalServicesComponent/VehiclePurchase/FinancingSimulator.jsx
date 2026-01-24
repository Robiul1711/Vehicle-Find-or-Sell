import { Label } from "@/components/ui/label";
import { ImageProvider } from "@/utils/ImageProvider";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";

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
  } = useForm();

  const resetForm = () => {
    reset();
    setResults(null);
  };

  const onSubmit = (data) => {
    const price = parseFloat(data.price);
    const downPayment = parseFloat(data.down_payment);
    const duration = parseInt(data.duration); // months
    const interestRate = parseFloat(data.interest); // annual %

    // Loan amount after down payment
    const loanAmount = price - downPayment;

    // Simple interest calculation
    const totalInterest = loanAmount * (interestRate / 100) * (duration / 12);

    // Total payable
    const totalToPay = loanAmount + totalInterest;

    // Monthly payment
    const monthlyPayment = totalToPay / duration;

    const results = {
      loanAmount,
      totalInterest,
      totalToPay,
      monthlyPayment: monthlyPayment.toFixed(2),
    };

    console.log(results);
    setResults(results);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 container">
        <div className="space-y-4 lg:space-y-10">
          <p className="lg:text-3xl font-bold">
            {section?.title || "Financing Simulator"}
          </p>
          <p className="lg:text-xl">
            {section?.description ||
              "Estimate your monthly payments and total loan cost in seconds."}
          </p>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="">
              <div className="space-y-2">
                <Label className="text-lg">{fields[0] || "Car Price"}</Label>
                <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                  <input
                    type="text"
                    {...register("price", { required: true })}
                    placeholder="Enter total vehicle price"
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
              </div>
              {errors.price && (
                <span className="text-red-500">Price is required</span>
              )}
            </div>

            <div className="">
              <div className="space-y-2">
                <Label className="text-lg">{fields[1] || "Down Payment"}</Label>
                <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                  <input
                    type="text"
                    {...register("down_payment", { required: true })}
                    placeholder="Enter initial payment"
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
              </div>
              {errors.down_payment && (
                <span className="text-red-500">Down Payment is required</span>
              )}
            </div>

            <div className="">
              <div className="space-y-2">
                <Label className="text-lg">{fields[2] || "Loan Term"}</Label>
                <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                  <input
                    type="text"
                    {...register("duration", { required: true })}
                    placeholder="Enter duration in months"
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
              </div>
              {errors.duration && (
                <span className="text-red-500">Month Duration is required</span>
              )}
            </div>

            <div className="">
              <div className="space-y-2">
                <Label className="text-lg">
                  {fields[3] || "Annual Interest Rate (%)"}
                </Label>
                <div className="border flex items-center gap-2 p-3 rounded-[10px]">
                  <input
                    type="text"
                    {...register("interest", { required: true })}
                    placeholder="Enter interest rate"
                    className="w-full border-none outline-none bg-transparent"
                  />
                </div>
              </div>
              {errors.interest && (
                <span className="text-red-500">
                  Annual Interest is required
                </span>
              )}
            </div>

            {results && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="w-full bg-[#EBF4FF] text-black py-3 rounded-[10px]">
                  Total Interest {results?.totalInterest}
                </button>
                <button className="w-full bg-[#EBF4FF] text-black py-3 rounded-[10px]">
                  Total to Pay {results?.totalToPay}
                </button>
                <button className="w-full bg-[#EBF4FF] text-black py-3 rounded-[10px]">
                  Monthly Payment {results?.monthlyPayment}
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-5">
              <button
                type="reset"
                onClick={resetForm}
                className="w-full bg-red-500 text-white py-3 rounded-[10px]"
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-full bg-custom-primary text-white py-3 rounded-[10px]"
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
