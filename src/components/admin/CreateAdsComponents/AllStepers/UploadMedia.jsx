import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UploadCloud, File, X } from "lucide-react";

const UploadMedia = () => {
  const { register, setValue, watch } = useFormContext();

  // Watch fields from react-hook-form
  const images = watch("images") || [];
  const videos = watch("videos") || [];
  // const documents = watch("documents") || [];

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

  // Handle Videos
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const updated = [...videos, ...files];
    setValue("videos", updated, { shouldValidate: true });
  };

  const removeVideo = (index) => {
    const updated = [...videos];
    updated.splice(index, 1);
    setValue("videos", updated);
  };

  // Handle Documents
  // const handleDocChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const updated = [...documents, ...files];
  //   setValue("documents", updated, { shouldValidate: true });
  // };

  // const removeDocument = (index) => {
  //   const updated = [...documents];
  //   updated.splice(index, 1);
  //   setValue("documents", updated);
  // };

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
            multiple
            className="hidden"
            onChange={handleVideoChange}
          />
          <UploadCloud className="w-6 h-6 text-gray-400" />
          <p className="text-sm text-gray-500">
            <span className="text-custom-primary">click to browse</span>
          </p>
        </label>

        {videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-3">
            {videos.map((file, idx) => (
              <div key={idx} className="relative">
                <video
                  controls
                  className="w-full h-40 rounded-md border object-cover"
                  src={URL.createObjectURL(file)}
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1"
                  onClick={() => removeVideo(idx)}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-2 text-xs text-orange-500 flex items-center gap-1">
          <File size={14} /> Upload your video now. It will be published after
          the add-on purchase.
        </p>
      </div>

      {/* Document Upload */}
      {/* <div>
        <h3 className="font-medium mb-2">Document</h3>
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-custom-primary">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleDocChange}
          />
          <UploadCloud className="w-6 h-6 text-gray-400" />
          <p className="text-sm text-gray-500">
            Attach important documents (e.g., registration papers, service
            history, warranty) or{" "}
            <span className="text-custom-primary">click to browse</span>
          </p>
        </label>

        {documents.length > 0 && (
          <div className="mt-3 space-y-2">
            {documents.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm text-gray-700 border p-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <File className="w-5 h-5 text-gray-500" />
                  {file.name}
                </div>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeDocument(idx)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default UploadMedia;
