import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UploadCloud, File, X } from "lucide-react";

const UploadMedia = () => {
  const { register, setValue, watch } = useFormContext();

  // Watch fields from react-hook-form
  const images = watch("images") || [];
  const video = watch("video") || null;
  const document = watch("document") || null;

  // Handle Images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updated = [...images, ...files];
    setValue("images", updated, { shouldValidate: true });
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setValue("images", updated);
  };

  // Handle Video
  const handleVideoChange = (e) => {
    setValue("video", e.target.files[0]);
  };

  // Handle Document
  const handleDocChange = (e) => {
    setValue("document", e.target.files[0]);
  };

  return (
    <div className="space-y-6 ">
      <h2 className="text-xl font-semibold">Upload Media</h2>

      {/* Image Upload */}
      <div>
        <h3 className="font-medium mb-2">Image</h3>
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-custom-primary">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
          <UploadCloud className="w-6 h-6 text-gray-400" />
          <p className="text-sm text-gray-500">
            Drag & drop your car, bike, or part photos here, or{" "}
            <span className="text-custom-primary">click to browse</span>
          </p>
        </label>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
            {images.map((file, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1"
                  onClick={() => removeImage(idx)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Upload */}
      <div>
        <h3 className="font-medium mb-2">Video</h3>
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-custom-primary">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoChange}
          />
          <UploadCloud className="w-6 h-6 text-gray-400" />
          <p className="text-sm text-gray-500">
            Drag & drop your car, bike, or part video here, or{" "}
            <span className="text-custom-primary">click to browse</span>
          </p>
        </label>

        {video && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            <video
              controls
              className="mt-3 w-full h-40 rounded-md border object-cover"
              src={URL.createObjectURL(video)}
            />
          </div>
        )}
        <p className="mt-2 text-xs text-orange-500 flex items-center gap-1">
          <File size={14} /> Upload your video now. It will be published after
          the add-on purchase.
        </p>
      </div>

      {/* Document Upload */}
      <div>
        <h3 className="font-medium mb-2">Document</h3>
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-custom-primary">
          <input type="file" className="hidden" onChange={handleDocChange} />
          <UploadCloud className="w-6 h-6 text-gray-400" />
          <p className="text-sm text-gray-500">
            Attach important documents (e.g., registration papers, service
            history, warranty) or{" "}
            <span className="text-custom-primary">click to browse</span>
          </p>
        </label>

        {document && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-700 border p-2 rounded-md">
            <File className="w-5 h-5 text-gray-500" />
            {document.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadMedia;
