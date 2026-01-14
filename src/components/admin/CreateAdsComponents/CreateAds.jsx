import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useApiMutation } from "@/hooks/useApiMutation";

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
  Truck: [
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
  ],
  Motorcycle: [
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
  ],
  Scooter: [
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

  const { mutate, isPending } = useApiMutation({
    url: "/ads/vehicles/",
    method: "POST",
    onSuccess: (data) => {
      setIsPostModalOpen(true);
      console.log("Success:", data);
    },
    onError: (error) => {
      console.log(error);
      console.error("Error submitting ad:", error);
    },
    secure: true,
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    console.log("Raw form data:", data);

    const formData = new FormData();

    // Helper to append data
    const append = (key, value) => {
      if (value === null || value === undefined) return;
      formData.append(key, value);
    };

    append("brand", data.brand);
    append("brand_name", data.brand);
    append("model", data.model);
    append("vehicle_type", selectedCategory?.toLowerCase() || "car");
    append("body", data.body);
    append("original_price", data.originalPrice);
    append("discount_price", data.discountPrice);
    append("mileage", data.mileage);
    append("fuel_type", data.fuelType);
    append("engine_type", data.engineSize);
    append("transmission", data.transmission);
    append("exact_date", data.exactDate);
    append("condition", data.condition);
    append("color", data.color);
    append("vat", data.deductibleVAT === "yes");
    append("vat_percentage", data.deductiblePercentage);
    append("description", data.description);
    append("co2_emission", data.co2Emissions);
    append("air_criteria", data.emissionStandard);
    append("warrenty_duration", data.warrantyDuration);
    append("number_of_owner", data.previousOwners);
    append("engine_size", data.engineSize);

    append("horsepower_cv", data.horsepowerCV);
    append("horsepower_din", data.horsepowerDIN);
    append("seat_height", data.seatHeight);
    append("door", data.door);
    append("kerb_weight", data.minimumKerWeight);
    append("is_active", true);

    // Engine Transmission (Nested Object)
    if (data.fuelTankCapacity) append("engine_transmission[fuelTankCapacity]", data.fuelTankCapacity);
    if (data.minimumKerWeight)
      append("engine_transmission[minimumKerWeight]", data.minimumKerWeight);
    if (data.maxTowingWeightBraked)
      append("engine_transmission[maxTowingWeightBraked]", data.maxTowingWeightBraked);
    if (data.maxTowingWeightUnbraked)
      append("engine_transmission[maxTowingWeightUnbraked]", data.maxTowingWeightUnbraked);
    if (data.turningCircle)
      append("engine_transmission[turningCircle]", data.turningCircle);

    // Seller Address (Array of Objects)
    // Assuming API expects flattened array syntax like seller_address[0][field]
    append("seller_address[city]", data.city);
    append("seller_address[country]", data.country);
    append("seller_address[zip_code]", data.zipCode);
    append("seller_address[street]", data.street);

    // Contact (Array of Objects)
    append("contact[name]", data.name);
    append("contact[phone]", data.contactNumber);
    append("contact[email]", data.email);
    append("contact[whatsapp]", data.whatsappNumber);

    // Registration
    if (data.registrationNumber) {
      append("registration[registration_number]", data.registrationNumber);
    }
    if (data.vinNumber) {
      append("registration[vin_number]", data.vinNumber);
    }

    // Registration Documents
    if (Array.isArray(data.documents)) {
      data.documents.forEach((doc) => {
        if (doc.file) {
          append("registration[document]", doc.file);
        }
      });
    }

    // Features
    // The features are now stored in data.features as an object: { id: boolean }
    if (data.features) {
      Object.keys(data.features).forEach((featureId) => {
        if (data.features[featureId] === true) {
          append("features", featureId);
        }
      });
    }

    // Media Uploads
    // Images
    if (Array.isArray(data.images)) {
      data.images.forEach((file) => {
        append("uploaded_images", file);
      });
    }

    // Videos
    if (Array.isArray(data.videos)) {
      data.videos.forEach((file) => {
        append("uploaded_videos", file);
      });
    }

    // Documents (General)
    if (Array.isArray(data.documents)) {
      data.documents.forEach((file) => {
        append("uploaded_documents", file);
      });
    }

    console.log("FormData created.");
    // Log entries for debugging
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    mutate(formData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {selectedCategory && (
          <StepProgressBar
            steps={steps.map((s) => s.label)}
            currentStep={currentStep + 1}
            onStepClick={(index) => setCurrentStep(index)}
            category={selectedCategory}
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
                  disabled={isPending}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
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
                      disabled={isPending}
                      className="px-4 py-2 bg-custom-secondary text-white rounded disabled:opacity-50"
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
                      disabled={isPending}
                      className="px-4 py-2 bg-custom-primary text-white rounded disabled:opacity-50 flex items-center gap-2"
                    >
                      {isPending ? "Posting..." : "Post Immediately"}
                    </button>
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
