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

// Modal
import ScheduleLaterModal from "./AllStepers/ScheduleLaterModal";
import PostImmediately from "./AllStepers/PostImmediately";
import PartsDetails from "./AllStepers/PartsDetails";
import PartsPreview from "./AllStepers/PartsPreview";
import { UtilityTrucksFeatures } from "./AllStepers/UtilityTrucksFeatures";
import { BikeFeatures } from "./AllStepers/BikeFeatures";
import { ScooterFeatures } from "./AllStepers/ScoterFeatures";
import UtilityTrucksPreview from "./AllStepers/UtilityTrucksPreview";

const stepsConfig = {
  car: [
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
    { id: 8, label: "Preview", component: UtilityTrucksPreview },
  ],
  UtilityTrucks: [
    { id: 0, label: "Category", component: SelectCategory },
    { id: 1, label: "Registration Number", component: RegistrationNumber },
    { id: 2, label: "Basic Details", component: BasicDetails },
    { id: 3, label: "Features", component: UtilityTrucksFeatures },
    {
      id: 4,
      label: "Engine & Transmission",
      component: EngineTransmissionSpaces,
    },
    { id: 5, label: "Upload Media", component: UploadMedia },
    { id: 6, label: "Seller Address", component: SellerAddress },
    { id: 7, label: "Contact Info", component: ContactInformation },
    { id: 8, label: "Preview", component: Preview },
  ],
  Motorcycle: [
    { id: 0, label: "Category", component: SelectCategory },
    { id: 1, label: "Registration Number", component: RegistrationNumber },
    { id: 2, label: "Basic Details", component: BasicDetails },
    { id: 3, label: "Features", component: BikeFeatures },
    {
      id: 4,
      label: "Engine & Transmission",
      component: EngineTransmissionSpaces,
    },
    { id: 5, label: "Upload Media", component: UploadMedia },
    { id: 6, label: "Seller Address", component: SellerAddress },
    { id: 7, label: "Contact Info", component: ContactInformation },
    { id: 8, label: "Preview", component: Preview },
  ],
  Scoter: [
    { id: 0, label: "Category", component: SelectCategory },
    { id: 1, label: "Registration Number", component: RegistrationNumber },
    { id: 2, label: "Basic Details", component: BasicDetails },
    { id: 3, label: "Features", component: ScooterFeatures },
    {
      id: 4,
      label: "Engine & Transmission",
      component: EngineTransmissionSpaces,
    },
    { id: 5, label: "Upload Media", component: UploadMedia },
    { id: 6, label: "Seller Address", component: SellerAddress },
    { id: 7, label: "Contact Info", component: ContactInformation },
    { id: 8, label: "Preview", component: Preview },
  ],
  Parts: [
    { id: 0, label: "Category", component: SelectCategory },
    { id: 1, label: "Parts Details", component: PartsDetails },
    { id: 2, label: "Upload Media", component: UploadMedia },
    { id: 3, label: " Address", component: SellerAddress },
    { id: 4, label: "Contact Info", component: ContactInformation },
    { id: 5, label: "Preview", component: PartsPreview },
  ],
};

const CreateAds = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const methods = useForm({ mode: "onChange" });

  const steps = selectedCategory
    ? stepsConfig[selectedCategory]
    : [{ id: 0, label: "Category", component: SelectCategory }];
  const CurrentComponent = steps[currentStep]?.component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    console.log("Final form data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {selectedCategory && (
          <StepProgressBar
            steps={steps.map((s) => s.label)}
            currentStep={currentStep + 1}
            onStepClick={(index) => setCurrentStep(index)}
              category={selectedCategory} // 👈 pass category here
          />
        )}

        {/* Step Component */}
        <div className="xl:px-14 ">
          <CurrentComponent
            goToStep={setCurrentStep}
            onCategorySelect={(cat) => {
              setSelectedCategory(cat);
              setCurrentStep(1);
            }}
          />

          {/* Navigation */}
          {selectedCategory && (
            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Back
                </button>
              )}

              <div className="ml-auto flex gap-2">
                {currentStep < steps.length - 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-custom-primary text-white rounded"
                  >
                    {currentStep === 0 ? "Continue" : "Next"}
                  </button>
                ) : currentStep === steps.length - 2 ? (
                  <button
                    type="button"
                    onClick={methods.handleSubmit((data) => {
                      console.log("Submitted at Contact Info:", data);
                      nextStep();
                    })}
                    className="px-4 py-2 bg-custom-primary text-white rounded"
                  >
                    Submit
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 bg-custom-secondary text-white rounded"
                    >
                      Schedule for Later
                    </button>
                    <ScheduleLaterModal
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />

                    <button
                      onClick={() => setIsPostModalOpen(true)}
                      type="submit"
                      className="px-4 py-2 bg-custom-primary text-white rounded"
                    >
                      Post Immediately
                    </button>
                    <PostImmediately
                      isModalOpen={isPostModalOpen}
                      setIsModalOpen={setIsPostModalOpen}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateAds;
