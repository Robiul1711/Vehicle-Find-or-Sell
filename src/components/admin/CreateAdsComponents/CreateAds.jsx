import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useParams, useNavigate } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";

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

import toast from "react-hot-toast";

const CreateAds = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const methods = useForm({ mode: "onChange" });

  // Fetch data if dealing with an edit
  const { data: existingData, isLoading: isFetching } = useApiQuery({
    queryKey: ["ads-vehicle-details", id],
    url: `/ads/vehicles/${id}/`,
    enabled: !!id,
    secure: true,
  });

  // Also try fetching parts if vehicle fetch fails or returns empty/wrong type?
  // Usually the ID would be unique across types or we try 404 handling.
  // For now assuming vehicles endpoint serves vehicles. If parts are separate:
  const { data: existingPartData, isLoading: isFetchingPart } = useApiQuery({
    queryKey: ["ads-part-details", id],
    url: `/ads/parts/${id}/`,
    enabled: !!id && !existingData, // Simple fallback logic, might need refinement
    secure: true,
  });

  useEffect(() => {
    const data = existingData || existingPartData;
    if (data && id) {
      // console.log("Populating form with:", data);

      // Determine standardized category ID
      let categoryId = "car";
      if (data.vehicle_type) {
        const typeLower = data.vehicle_type.toLowerCase();
        if (["car", "cars"].includes(typeLower)) categoryId = "car";
        // Check for 'truck' or 'utility trucks' etc if needed, but 'truck' usually suffices
        else if (typeLower.includes("truck")) categoryId = "Truck";
        else if (
          ["motorcycle", "motorcycles", "bike", "bikes"].includes(typeLower)
        )
          categoryId = "Motorcycle";
        else if (["scooter", "scooters"].includes(typeLower))
          categoryId = "Scooter";
        else if (["part", "parts"].includes(typeLower)) categoryId = "Parts";
        else categoryId = data.vehicle_type;
      } else if (data.part_name || data.part_number_sku) {
        categoryId = "Parts";
      }

      setSelectedCategory(categoryId);
      // Advance to next step so user sees data, not category selection
      if (currentStep === 0) setCurrentStep(1);

      // Map API response to form fields
      // Common fields
      const formattedData = {
        brand: data.brand || data.brand_name, // API might return brand_name or brand
        model: data.model,
        vehicle_type: categoryId,
        body: data.body,
        originalPrice: data.original_price,
        discountPrice: data.discount_price,
        mileage: data.mileage,
        fuelType: data.fuel_type,
        // engineSize mapped to engine_type in submission, but engine_size in append
        engine_type: data.engine_type,
        transmission: data.transmission,
        exactDate: data.exact_date,
        condition: data.condition,
        color: data.color,
        deductibleVAT: data.vat ? "yes" : "no",
        deductiblePercentage: data.vat_percentage,
        description: data.description,
        co2Emissions: data.co2_emission,
        emissionStandard: data.air_criteria,
        warrantyDuration: data.warrenty_duration,
        previousOwners: data.number_of_owner,

        horsepowerCV: data.horsepower_cv,
        horsepowerDIN: data.horsepower_din,
        seatHeight: data.seat_height,
        door: data.door,
        minimumKerWeight: data.kerb_weight,

        // Technical Spec (Engine Transmission nested in fetch? likely flattened or in engine_transmission object)
        fuelTankCapacity: data.engine_transmission?.fuelTankCapacity,
        // minimumKerWeight: data.engine_transmission?.minimumKerWeight, // Already mapped locally or flattened?
        maxTowingWeightBraked: data.engine_transmission?.maxTowingWeightBraked,
        maxTowingWeightUnbraked:
          data.engine_transmission?.maxTowingWeightUnbraked,
        turningCircle: data.engine_transmission?.turningCircle,

        // Seller Address
        city: data.seller_address?.[0]?.city || data.seller_address?.city,
        country:
          data.seller_address?.[0]?.country || data.seller_address?.country,
        zipCode:
          data.seller_address?.[0]?.zip_code || data.seller_address?.zip_code,
        street: data.seller_address?.[0]?.street || data.seller_address?.street,

        // Contact
        name: data.contact?.[0]?.name || data.contact?.name,
        contactNumber: data.contact?.[0]?.phone || data.contact?.phone,
        email: data.contact?.[0]?.email || data.contact?.email,
        whatsappNumber: data.contact?.[0]?.whatsapp || data.contact?.whatsapp,

        // Registration
        registrationNumber:
          data.registration?.[0]?.registration_number ||
          data.registration?.registration_number,
        vinNumber:
          data.registration?.[0]?.vin_number || data.registration?.vin_number,

        // Documents
        documents:
          data.documents?.map((doc) => ({
            id: doc.id,
            name: doc.document.split("/").pop(),
            file: doc.document,
            isExisting: true,
          })) || [],

        // Parts specific
        part_name: data.part_name,
        part_number_sku: data.part_number_sku,
        main_system: data.main_system,
        sub_system: data.sub_system,
        compatible_make: data.compatible_make,
        compatible_model: data.compatible_model,
        compatible_year: data.compatible_year,
        material: data.material,
        length: data.length,
        width: data.width,
        height: data.height,
        unit: data.unit,
        weight: data.weight,
        position_on_vehicle: data.position_on_vehicle,
        quantity_in_stock: data.quantity_in_stock,

        // Features - map back to { [id]: true }
        features:
          data.features_obj?.reduce(
            (acc, feat) => ({ ...acc, [feat.id]: true }),
            {},
          ) || {},

        // Media
        images: data.media?.image || [],
        videos: data.media?.video || [],
      };

      // If features comes as array of IDs:
      if (Array.isArray(data.features)) {
        formattedData.features = data.features.reduce(
          (acc, id) => ({ ...acc, [id]: true }),
          {},
        );
      }

      methods.reset(formattedData);
    } else if (!id) {
      // Check for draft ad on mount if no id (not editing an existing one)
      const draftStr = localStorage.getItem("draftAd");
      if (draftStr) {
        try {
          const draft = JSON.parse(draftStr);
          if (draft.data) {
            methods.reset(draft.data);
            if (draft.category) setSelectedCategory(draft.category);
            if (draft.step !== undefined) setCurrentStep(draft.step);
          }
        } catch (e) {
          console.error("Error parsing draft ad:", e);
        }
      }
    }
  }, [existingData, existingPartData, id, methods]);

  const steps = selectedCategory
    ? stepsConfig[selectedCategory]
    : [{ id: 0, label: "Category", component: SelectCategory }];
  const CurrentComponent = steps[currentStep]?.component;
  // console.log(methods.watch().vehicle_type);

  const { mutate, isPending } = useApiMutation({
    url: id
      ? methods.watch().part_name
        ? `/ads/parts/${id}/`
        : `/ads/vehicles/${id}/`
      : methods.watch().part_name
        ? "/ads/parts/"
        : "/ads/vehicles/",
    method: id ? "PUT" : "POST",
    onSuccess: (data) => {
      setIsPostModalOpen(true);
      setIsModalOpen(false);
      localStorage.removeItem("draftAd");
      // console.log("Success:", data);
      // toast.success("Ad posted successfully");
      navigate("/dashboard/my-adds");
    },
    onError: (error, toastId) => {
      console.error("Submission failed:", error);
      if (error?.response?.data) {
        const errorData = error.response.data;

        // Redirect to subscription if not subscribed
        if (
          errorData.is_subscribed === false ||
          (errorData.message &&
            errorData.message.includes("Active ads limit reached"))
        ) {
          // Save form data to localStorage (excluding files)
          const formData = methods.getValues();
          const dataToSave = { ...formData };
          delete dataToSave.images;
          delete dataToSave.videos;
          delete dataToSave.documents;

          localStorage.setItem(
            "draftAd",
            JSON.stringify({
              data: dataToSave,
              category: selectedCategory,
              step: currentStep,
            }),
          );

          window.open("/dashboard/subscription", "_blank");
          toast.error(
            errorData.message || "Please purchase a package to publish ads.",
            { id: toastId },
          );
          return true;
        }

        const errorMessages = [];

        const processErrors = (data, parentKey = "") => {
          Object.entries(data).forEach(([key, value]) => {
            const formattedKey = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            const label = parentKey
              ? `${parentKey} > ${formattedKey}`
              : formattedKey;

            if (Array.isArray(value)) {
              value.forEach((msg) => {
                errorMessages.push(`${label}: ${msg}`);
              });
            } else if (typeof value === "object" && value !== null) {
              processErrors(value, formattedKey);
            } else if (typeof value === "string") {
              errorMessages.push(`${label}: ${value}`);
            }
          });
        };

        processErrors(errorData);

        if (errorMessages.length > 0) {
          toast.error(
            <div className="text-left">
              <span className="font-bold">Validation Errors:</span>
              <ul className="list-disc pl-4 mt-1 text-sm">
                {errorMessages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>,
            { id: toastId, duration: 6000 },
          );
          return true; // Mark as handled to skip default generic toast
        }
      }
      return false;
    },
    errorMessage: "Submission failed. Please check the fields.",
    secure: true,
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    // console.log("Raw form data:", data);

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
    append("engine_type", data.engine_type);
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

    append("horsepower_cv", data.horsepowerCV);
    append("horsepower_din", data.horsepowerDIN);
    append("seat_height", data.seatHeight);
    append("door", data.door);
    append("kerb_weight", data.minimumKerWeight);
    append("is_active", true);

    // Engine Transmission (Nested Object)
    if (data.fuelTankCapacity)
      append("engine_transmission[fuelTankCapacity]", data.fuelTankCapacity);
    if (data.minimumKerWeight)
      append("engine_transmission[minimumKerWeight]", data.minimumKerWeight);
    if (data.maxTowingWeightBraked)
      append(
        "engine_transmission[maxTowingWeightBraked]",
        data.maxTowingWeightBraked,
      );
    if (data.maxTowingWeightUnbraked)
      append(
        "engine_transmission[maxTowingWeightUnbraked]",
        data.maxTowingWeightUnbraked,
      );
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

    //parts details
    append("part_name", data.part_name);
    append("part_number_sku", data.part_number_sku);
    append("main_system", data.main_system);
    append("sub_system", data.sub_system);
    append("compatible_make", data.compatible_make);
    append("compatible_model", data.compatible_model);
    append("compatible_year", data.compatible_year);
    append("material", data.material);
    append("length", data.length);
    append("width", data.width);
    append("height", data.height);
    append("unit", data.unit);
    append("weight", data.weight);
    append("position_on_vehicle", data.position_on_vehicle);
    append("quantity_in_stock", data.quantity_in_stock);
    append("description", data.description);
    // Documents
    if (Array.isArray(data.documents)) {
      data.documents.forEach((doc) => {
        if (doc.file instanceof File) {
          append("documents", doc.file);
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

    if (Array.isArray(data.images)) {
      data.images.forEach((file) => {
        if (file instanceof File) {
          append("uploaded_images", file);
        }
      });
    }

    // Videos
    if (Array.isArray(data.videos)) {
      data.videos.forEach((file) => {
        if (file instanceof File) {
          append("uploaded_videos", file);
        }
      });
    }

    // Schedule keys
    if (data.scheduled_date) {
      append("scheduled_date", data.scheduled_date);
    }
    if (data.scheduled_time) {
      append("scheduled_time", data.scheduled_time);
    }

    // console.log("FormData created.");
    // Log entries for debugging
    for (const pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    mutate(formData);
  };

  if (
    id &&
    isFetching &&
    isFetchingPart &&
    !existingData &&
    !existingPartData
  ) {
    return <div className="p-10 text-center">Loading ad details...</div>;
  }

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
                  BACK
                </button>
              )}

              <div className="ml-auto flex gap-2">
                {currentStep < steps.length - 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-custom-primary text-white rounded"
                  >
                    {currentStep === 0 ? "Continue" : "NEXT"}
                  </button>
                ) : currentStep === steps.length - 2 ? (
                  <button
                    type="button"
                    onClick={methods.handleSubmit((data) => {
                      // console.log("Submitted at Contact Info:", data);
                      nextStep();
                    })}
                    className="px-4 py-2 bg-custom-primary text-white rounded"
                  >
                    SUBMIT
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
                      onConfirm={onSubmit}
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
