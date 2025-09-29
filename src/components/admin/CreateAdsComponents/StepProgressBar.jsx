import React from "react";
import clsx from "clsx";
import {
  RegistrationIcon,
  BasicDetailsIcon,
  FeaturesIcon,
  EngineIcon,
  MediaIcon,
  AddressIcon,
  PreviewIcon,
} from "@/components/common/SVGicons/ProgressBarIcons";
import { ContactIcon } from "lucide-react";
import { DashboardIcon } from "@/components/common/SVGicons/DashboardIcon";
const StepProgressBar = ({ steps, currentStep, onStepClick, category }) => {
  // Map icons for vehicle categories
  const stepIcons = [
    <DashboardIcon key="cat" />,
    <RegistrationIcon key="reg" />,
    <BasicDetailsIcon key="basic" />,
    <FeaturesIcon key="features" />,
    <EngineIcon key="engine" />,
    <MediaIcon key="media" />,
    <AddressIcon key="address" />,
    <ContactIcon key="contact" />,
    <PreviewIcon key="preview" />,
  ];

  // Map icons for "Parts"
  const partsstepIcons = [
    <DashboardIcon key="cat" />,
    <BasicDetailsIcon key="basic" />,
    <MediaIcon key="media" />,
    <AddressIcon key="address" />,
    <ContactIcon key="contact" />,
    <PreviewIcon key="preview" />,
  ];

  // ✅ Decide which icons to use
  const activeIcons = category === "Parts" ? partsstepIcons : stepIcons;

  return (
    <div className="flex items-center justify-between pb-10 mx-auto w-full overflow-x-auto">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;
        const isLastStep = index === steps.length - 1;

        return (
          <div key={index} className="flex-1 flex flex-col items-center relative">
            {/* Connector Line - before each step except the first */}
            {index !== 0 && (
              <div className="absolute top-6 left-0 right-1/2 h-0.5">
                <div
                  className={clsx(
                    "h-full w-full",
                    isCompleted || isActive ? "bg-custom-primary" : "bg-gray-300"
                  )}
                />
              </div>
            )}

            {/* Connector Line - after each step except the last */}
            {!isLastStep && (
              <div className="absolute top-6 left-1/2 right-0 h-0.5">
                <div
                  className={clsx(
                    "h-full w-full",
                    isCompleted ? "bg-custom-primary" : "bg-gray-300"
                  )}
                />
              </div>
            )}

            {/* Step Circle with Icon */}
            <div
              onClick={() => onStepClick && onStepClick(index)}
              className={clsx(
                "z-10 w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 cursor-pointer",
                isActive
                  ? "border-2 border-custom-primary bg-custom-primary text-white shadow-lg shadow-custom-primary/40"
                  : isCompleted
                  ? "border-2 border-dashed border-custom-primary text-custom-primary bg-white"
                  : "border border-gray-300 bg-white text-gray-400"
              )}
            >
              {activeIcons[index]}
            </div>

            {/* Step Label */}
            <div
              className={clsx(
                "text-xs text-center mt-2 px-2 font-medium whitespace-nowrap",
                isActive
                  ? "text-custom-primary"
                  : isCompleted
                  ? "text-custom-primary"
                  : "text-gray-400"
              )}
            >
              {step}
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default StepProgressBar;
