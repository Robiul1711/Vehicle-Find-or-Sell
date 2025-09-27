import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

// Steps
import SelectCategory from "./AllStepers/SelectCategory";
import RegistrationNumber from "./AllStepers/RegistrationNumber";
import BasicDetails from "./AllStepers/BasicDetails";
import EngineTransmissionSpaces from "./AllStepers/EngineTransmissionSpaces";
import UploadMedia from "./AllStepers/UploadMedia";
import SellerAddress from "./AllStepers/SellerAddress";
import ContactInformation from "./AllStepers/ContactInformation";
import Preview from "./AllStepers/Preview";
import StepProgressBar from "./StepProgressBar";
import { SelectFeatures } from "./AllStepers/SelectFeatures";

const steps = [
  { id: 0, label: "Category", component: SelectCategory },
  { id: 1, label: "Registration Number", component: RegistrationNumber },
  { id: 2, label: "Basic Details", component: BasicDetails },
  { id: 3, label: "Features", component: SelectFeatures },
  {
    id: 4,
    label: "Engine & Transmission",
    component: EngineTransmissionSpaces,
  },
  { id: 5, label: "Upload Media", component: UploadMedia },
  { id: 6, label: "Seller Address", component: SellerAddress },
  { id: 7, label: "Contact Info", component: ContactInformation },
  { id: 8, label: "Preview", component: Preview },
];

const CreateAds = () => {
  const methods = useForm({
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const activeStep = currentStep;
  const CurrentComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = (data) => {
    console.log("Final form data:", data);
    // send data to backend
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Step Progress */}
        <StepProgressBar
          steps={steps.map((s) => s.label)}
          currentStep={activeStep + 1}
          onStepClick={(index) => setCurrentStep(index)}
        />

        {/* Step Component */}
        <CurrentComponent goToStep={setCurrentStep} />

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {/* Back button */}
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}

          {/* Right side buttons */}
          <div className="ml-auto flex gap-2">
            {currentStep === 0 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-custom-primary text-white rounded"
              >
                Continue
              </button>
            ) : currentStep < steps.length - 2 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-custom-primary text-white rounded"
              >
                Next
              </button>
            ) : currentStep === steps.length - 2 ? (
              // Contact Info step -> Submit & go Preview
              <button
                type="button"
                onClick={methods.handleSubmit((data) => {
                  console.log("Submitted at Contact Info:", data);

                  nextStep(); // go to Preview step
                })}
                className="px-4 py-2 bg-custom-primary text-white rounded"
              >
                Submit
              </button>
            ) : (
              // Preview step -> two buttons
              <>
                <button
                  type="button"
                  onClick={() =>
                    methods.handleSubmit((data) => {
                      console.log("Scheduled for later:", data);
                      // Call backend API with "scheduled" flag
                    })()
                  }
                  className="px-4 py-2 bg-custom-secondary text-white rounded"
                >
                  Schedule for Later
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-custom-primary text-white rounded"
                >
                  Post Immediately
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateAds;
