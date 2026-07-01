import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Upload, X, Search, Loader2, Lock } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import toast from "react-hot-toast";

export default function RegistrationNumber({ goToStep }) {
  const { register, setValue, watch } = useFormContext();

  // Watch values from form context
  const uploadedFiles = watch("documents") || [];
  const registrationNumber = watch("registrationNumber");
  const vinNumber = watch("vinNumber");

  const { mutate: decodeVin, isPending: isDecoding } = useApiMutation({
    url: "/ads/vin-decoder/",
    method: "POST",
    secure: true,
    onSuccess: (response) => {
      if (response.success && response.data?.vehicle) {
        const vehicle = response.data.vehicle;

        // Map vehicle data to form fields
        if (vehicle.brand) setValue("brand", vehicle.brand);
        if (vehicle.model) setValue("model", vehicle.model);
        if (vehicle.version) setValue("version", vehicle.version);
        if (vehicle.body) setValue("body", vehicle.body);
        if (vehicle.fuel_type) setValue("fuelType", vehicle.fuel_type);
        if (vehicle.engine_type) setValue("engine_type", vehicle.engine_type);
        if (vehicle.transmission)
          setValue("transmission", vehicle.transmission);
        if (vehicle.exact_date) setValue("exactDate", vehicle.exact_date);
        if (vehicle.co2_emission)
          setValue("co2Emissions", vehicle.co2_emission);
        if (vehicle.air_criteria)
          setValue("emissionStandard", vehicle.air_criteria);
        if (vehicle.number_of_owner)
          setValue("previousOwners", vehicle.number_of_owner);
        if (vehicle.horsepower_cv)
          setValue("horsepowerCV", vehicle.horsepower_cv);
        if (vehicle.horsepower_din)
          setValue("horsepowerDIN", vehicle.horsepower_din);
        if (vehicle.door) setValue("door", vehicle.door);
        if (vehicle.color) setValue("color", vehicle.color);
        if (vehicle.kerb_weight)
          setValue("minimumKerWeight", vehicle.kerb_weight);

        // Registration details
        if (response.data.registration) {
          const reg = response.data.registration;
          if (reg.registration_number)
            setValue("registrationNumber", reg.registration_number);
          if (reg.vin_number) setValue("vinNumber", reg.vin_number);
        }

        // Nested engine_transmission data
        if (vehicle.engine_transmission) {
          const et = vehicle.engine_transmission;
          if (et.fuel_tank_capacity)
            setValue("fuelTankCapacity", et.fuel_tank_capacity);
          if (et.max_towing_weight_braked)
            setValue("maxTowingWeightBraked", et.max_towing_weight_braked);
          if (et.max_towing_weight_unbraked)
            setValue("maxTowingWeightUnbraked", et.max_towing_weight_unbraked);
          if (et.turning_circle) setValue("turningCircle", et.turning_circle);
        }

        if (vehicle.extra) {
          setValue("technicalSpecs", vehicle.extra);
        }

        if (response.data.trim_versions) {
          setValue("trim_versions", response.data.trim_versions);
        } else {
          setValue("trim_versions", []);
        }

        goToStep(2);
      }
    },
  });

  const handleLookup = () => {
    if (!registrationNumber && !vinNumber) {
      toast.error("Please enter a Registration Number or VIN Number");
      return;
    }
    decodeVin({
      immat: registrationNumber,
      vin: vinNumber,
    });
  };

  const showRequiredMessage =
    (!registrationNumber || registrationNumber.toString().trim() === "") &&
    (!vinNumber || vinNumber.toString().trim() === "");

  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      file: file,
    }));
    setValue("documents", [...uploadedFiles, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const removeFile = (id) => {
    setValue(
      "documents",
      uploadedFiles.filter((file) => file.id !== id),
    );
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="">
      <div className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          {/* Registration Number */}
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium text-gray-900">
              Registration Number
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("registrationNumber")}
                placeholder="Enter your registration number..."
                className="w-full px-4 md:py-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors placeholder-gray-400"
              />
            </div>
          </div>

          {/* VIN Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              VIN Number (optional)
            </label>
            <div className="flex flex-wrap md:flex-nowrap gap-2">
              <input
                type="text"
                {...register("vinNumber")}
                placeholder="0"
                className="flex-1 px-4 md:py-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors placeholder-gray-400"
              />
              <button
                type="button"
                onClick={handleLookup}
                disabled={isDecoding}
                className="px-6 md:py-3 py-2 bg-custom-primary text-white rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 whitespace-nowrap"
              >
                {isDecoding ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>Find Vehicle</span>
              </button>
            </div>
          </div>
        </div>

        {/* {showRequiredMessage && (
          <div className="flex items-start space-x-3 bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
            <div className="flex-shrink-0 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <p className="text-sm text-red-800">
              <span>Registration number or VIN number is required.</span>
            </p>
          </div>
        )} */}
        {/* Document Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">
            Document
          </label>

          {/* Upload Area */}
          <div
            className={`group border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer relative ${
              isDragOver
                ? "border-custom-primary bg-custom-primary/5 shadow-inner"
                : "border-gray-200 bg-gray-50/50 hover:border-custom-primary/50 hover:bg-custom-primary/[0.02]"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`p-4 rounded-full transition-all duration-300 ${
                isDragOver ? "bg-custom-primary/20 text-custom-primary scale-110" : "bg-gray-100 text-gray-400 group-hover:bg-custom-primary/10 group-hover:text-custom-primary group-hover:scale-110"
              }`}>
                <Upload className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-medium text-gray-700">
                  <span>Drag & drop or </span>
                  <label className="inline-block">
                    <span className="text-custom-secondary hover:underline cursor-pointer font-bold">
                      browse
                    </span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileInput}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </label>
                  <span> your files here</span>
                </p>
                <p className="text-xs text-gray-400">
                  Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-white border border-gray-100 p-3.5 rounded-xl shadow-xs hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-custom-primary/5 rounded-lg flex items-center justify-center text-custom-primary">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        <span>{file.name}</span>
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        <span>{formatFileSize(file.size)}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data Protection / Security Notice */}
        <div className="flex items-start space-x-4 bg-amber-50/60 dark:bg-amber-950/20 p-5 rounded-xl border border-amber-100 dark:border-amber-900/50 shadow-sm relative overflow-hidden">
          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-custom-secondary" />
          
          <div className="flex-shrink-0 p-2 bg-custom-secondary/10 text-custom-secondary rounded-lg mt-0.5">
            <Lock className="w-5 h-5" />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <span>Data Protection</span>
            </h4>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-2">
              <p>
                The documents you publish may be visible to buyers interested in your vehicle. To protect your privacy, make sure to hide any personal or confidential information before posting.
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                Keep only the information relevant to the vehicle's history and maintenance. Ronpoin recommends never sharing banking details, signatures, or complete identity documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
