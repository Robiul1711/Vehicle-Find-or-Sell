import React, { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { useFormContext } from "react-hook-form";
import { IMG_URL } from "@/config/constant";

// Reusable Section component
const Section = ({ title, content, sectionKey, onEdit }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      <button
        onClick={() => onEdit(sectionKey)}
        className="flex items-center gap-1 font-bold text-gray-500 hover:text-blue-600 "
      >
        <RiEdit2Fill className="w-5 h-5 " />
        Edit
      </button>
    </div>
    <div className="text-gray-900">{content}</div>
  </div>
);

const UtilityTrucksPreview = ({ goToStep }) => {
  const [editingSection, setEditingSection] = useState(null);
  const { watch } = useFormContext();
  const formData = watch();

  // ✅ Convert checkbox-style features into arrays
  const getFeatures = (prefix) => {
    return Object.keys(formData)
      .filter((key) => key.startsWith(prefix) && formData[key])
      .map((key) => key.replace(prefix, "").trim());
  };

  const handleEdit = (sectionKey) => {
    switch (sectionKey) {
      case "basicDetails":
        goToStep(2);
        break;
      case "features":
        goToStep(3);
        break;
      case "engine":
        goToStep(4);
        break;
      case "media":
        goToStep(5);
        break;
      case "sellerAddress":
        goToStep(6);
        break;
      case "contact":
        goToStep(7);
        break;
      default:
        setEditingSection(sectionKey);
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Details */}
      <Section
        title="Basic Details"
        sectionKey="basicDetails"
        onEdit={handleEdit}
        content={
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Brand:</strong> {formData.brand}
            </div>
            <div>
              <strong>Model:</strong> {formData.model}
            </div>
            <div>
              <strong>Price:</strong> {formData.originalPrice}
            </div>
            <div>
              <strong>Discount Price:</strong> {formData.discountPrice}
            </div>
            <div>
              <strong>Color:</strong> {formData.color}
            </div>
            <div>
              <strong>Registration Number:</strong>{" "}
              {formData.registrationNumber}
            </div>
          </div>
        }
      />

      {/* Features */}
      <Section
        title="Features"
        sectionKey="features"
        onEdit={handleEdit}
        content={
          <div className="grid grid-cols-2 gap-2">
            {getFeatures("comfort_convenience").map((f, i) => (
              <span key={i}>Comfort Feature {f}</span>
            ))}
            {getFeatures("security").map((f, i) => (
              <span key={i}>Security Feature {f}</span>
            ))}
            {getFeatures("interior_features").map((f, i) => (
              <span key={i}>Interior Feature {f}</span>
            ))}
            {getFeatures("exterior_features").map((f, i) => (
              <span key={i}>Exterior Feature {f}</span>
            ))}
          </div>
        }
      />

      {/* Engine & Transmission */}
      <Section
        title="Engine & Transmission"
        sectionKey="engine"
        onEdit={handleEdit}
        content={
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Fuel Tank Capacity:</strong> {formData.fuelTankCapacity}
            </div>
            <div>
              <strong>Engine Size:</strong> {formData.engineSize}
            </div>
            <div>
              <strong>Horsepower (CV):</strong> {formData.horsepowerCV}
            </div>
            <div>
              <strong>Horsepower (DIN):</strong> {formData.horsepowerDIN}
            </div>
            <div>
              <strong>Max Towing (Braked):</strong>{" "}
              {formData.maxTowingWeightBraked}
            </div>
            <div>
              <strong>Max Towing (Unbraked):</strong>{" "}
              {formData.maxTowingWeightUnbraked}
            </div>
            <div>
              <strong>Transmission:</strong> {formData.transmission}
            </div>
          </div>
        }
      />

      {/* Upload Media */}
      <Section
        title="Upload Media"
        sectionKey="media"
        onEdit={handleEdit}
        content={
          <div className="space-y-4">
            {/* Images */}
            <div className="flex flex-wrap gap-2">
              {formData.images &&
                Array.from(formData.images).map((file, idx) => {
                  let src = "";
                  if (file instanceof File) {
                    src = URL.createObjectURL(file);
                  } else if (file?.file) {
                    src = IMG_URL + file.file;
                  } else if (typeof file === "string") {
                    src = file;
                  }

                  return (
                    <img
                      key={idx}
                      src={src}
                      alt={`car-${idx}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                  );
                })}
            </div>
            {/* Video */}
            {(formData.video ||
              (formData.videos && formData.videos.length > 0)) &&
              (() => {
                const videoFile = formData.video || formData.videos[0];
                let src = "";
                if (videoFile instanceof File) {
                  src = URL.createObjectURL(videoFile);
                } else if (videoFile?.file) {
                  src = IMG_URL + videoFile.file;
                } else if (typeof videoFile === "string") {
                  src = videoFile;
                }
                return (
                  <video src={src} controls className="w-64 rounded border" />
                );
              })()}
            {/* Document */}
            {formData.document && (
              <a
                href={URL.createObjectURL(formData.document)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {formData.document.name}
              </a>
            )}
          </div>
        }
      />

      {/* Seller Address */}
      <Section
        title="Seller Address"
        sectionKey="sellerAddress"
        onEdit={handleEdit}
        content={
          <div>
            {formData.street}, {formData.city}, {formData.zipCode},{" "}
            {formData.country}
          </div>
        }
      />

      {/* Contact Information */}
      <Section
        title="Contact Information"
        sectionKey="contact"
        onEdit={handleEdit}
        content={
          <div>
            <div>
              <strong>Name:</strong> {formData.name}
            </div>
            <div>
              <strong>Email:</strong> {formData.email}
            </div>
            <div>
              <strong>Contact:</strong> {formData.contactNumber}
            </div>
            <div>
              <strong>WhatsApp:</strong> {formData.whatsappNumber}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default UtilityTrucksPreview;
