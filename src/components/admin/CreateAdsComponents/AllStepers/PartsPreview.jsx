
import React from "react";
import { useFormContext } from "react-hook-form";

const PartsPreview = ({ goToStep }) => {
  const { watch } = useFormContext();
  const formData = watch();
  // console.log(formData);
  const EditButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
      Edit
    </button>
  );

  const SectionHeader = ({ title, onEdit }) => (
    <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <EditButton onClick={onEdit} />
    </div>
  );

  const DetailRow = ({ label, value, cols = 1 }) => (
    <div className={`${cols === 2 ? "col-span-2" : ""}`}>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-base text-gray-900 font-medium">{value || "-"}</div>
    </div>
  );

  return (
    <div className="">
      {/* Parts Details Section */}
      <div className="mb-8">
        <SectionHeader title="Parts Details" onEdit={() => goToStep(1)} />
        <div className="grid grid-cols-4 gap-6">
          <DetailRow label="Part Name" value={formData.part_name} />
          <DetailRow label="Category" value={formData.vehicle_type} />
          <DetailRow label="Vehicle Type" value={formData.vehicle_type} />
          <DetailRow label="Brand / Manufacturer" value={formData.brand} />
          <DetailRow
            label="Part Number / SKU"
            value={formData.part_number_sku}
          />

          <DetailRow label="Main System" value={formData.main_system} />
          <DetailRow
            label="Sub-System / Sub-Part"
            value={formData.sub_system}
          />
          <DetailRow label="Compatible Make" value={formData.compatible_make} />
          <DetailRow
            label="Compatible Model(s)"
            value={formData.compatible_model}
          />

          <DetailRow
            label="Compatible Year(s)"
            value={formData.compatible_year}
          />

          <DetailRow label="Material" value={formData.material} />
          <DetailRow label="Dimension Unit" value={formData.unit} />
          <DetailRow label="Length (L)" value={formData.length} />
          <DetailRow label="Width (W)" value={formData.width} />

          <DetailRow label="Height (H)" value={formData.height} />
          <DetailRow label="Weight" value={formData.weight} />
          <DetailRow
            label="Position on Vehicle"
            value={formData.position_on_vehicle}
          />
          <DetailRow label="Color" value={formData.color} />

          <DetailRow label="Original Price" value={formData.original_price} />
          <DetailRow label="Discount Price" value={formData.discount_price} />
          <DetailRow
            label="Quantity in Stock"
            value={formData.quantity_in_stock}
          />
          <DetailRow label="Warranty" value={formData.warrenty_duration} />

          <DetailRow
            label="Description"
            value={formData.description}
            cols={2}
          />
        </div>
      </div>

      {/* Upload Media Section */}
      <div className="mb-8">
        <SectionHeader title="Upload Media" onEdit={() => goToStep(2)} />
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600 mb-2">Images</div>
            <div className="flex flex-wrap gap-3">
              {formData.images && Array.from(formData.images).length > 0
                ? Array.from(formData.images).map((file, idx) => {
                    let src = "";
                    if (file instanceof File) {
                      src = URL.createObjectURL(file);
                    } else if (file?.file) {
                      src = file.file;
                    } else if (typeof file === "string") {
                      src = file;
                    }
                    return (
                      <img
                        key={idx}
                        src={src}
                        alt={`part-${idx}`}
                        className="w-24 h-24 object-cover rounded border border-gray-300"
                      />
                    );
                  })
                : // Placeholder images
                  Array.from({ length: 0 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-24 h-24 bg-gray-200 rounded border border-gray-300 flex items-center justify-center"
                    >
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  ))}
            </div>
          </div>

          {formData.videos &&
            Array.from(formData.videos).length > 0 &&
            (() => {
              const videoFile = Array.from(formData.videos)[0];
              let src = "";
              if (videoFile instanceof File) {
                src = URL.createObjectURL(videoFile);
              } else if (videoFile?.file) {
                src = videoFile.file;
              } else if (typeof videoFile === "string") {
                src = videoFile;
              }

              return (
                <div>
                  <div className="text-sm text-gray-600 mb-2">Video</div>
                  <video
                    src={src}
                    controls
                    className="w-80 h-48 rounded border border-gray-300"
                  />
                </div>
              );
            })()}

          {formData.document && (
            <div>
              <div className="text-sm text-gray-600 mb-2">Document</div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded w-fit">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                <a
                  href={URL.createObjectURL(formData.document)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  {formData.document.name || "Parts-Brochure.pdf"}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seller Address Section */}
      <div className="mb-8">
        <SectionHeader title="Seller Address" onEdit={() => goToStep(3)} />
        <div>
          <div className="text-sm text-gray-600 mb-1">Seller Location</div>
          <div className="text-base text-gray-900 font-medium">
            {formData.street && formData.city && formData.zipCode
              ? `${formData.street}, ${formData.city}, ${
                  formData.state || "AK"
                } ${formData.zipCode}`
              : ""}
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mb-8">
        <SectionHeader title="Contact Information" onEdit={() => goToStep(4)} />
        <div className="grid grid-cols-4 gap-6">
          <DetailRow label="Name" value={formData.name} />
          <DetailRow label="Email" value={formData.email} />
          <DetailRow label="Contact Number" value={formData.contactNumber} />
          <DetailRow label="WhatsApp Number" value={formData.whatsappNumber} />
        </div>
      </div>
    </div>
  );
};

export default PartsPreview;
