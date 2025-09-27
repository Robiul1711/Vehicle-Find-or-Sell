import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Upload, X } from "lucide-react";

export default function RegistrationNumber() {
  const { register, control, setValue, watch } = useFormContext();

  // Watch values from form context
  const uploadedFiles = watch("documents") || [];

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
      uploadedFiles.filter((file) => file.id !== id)
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="md:p-6">
      <div className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registration Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Registration Number
            </label>
            <input
              type="text"
              {...register("registrationNumber")}
              placeholder="Enter your registration number..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors placeholder-gray-400"
            />
          </div>

          {/* VIN Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              VIN Number (optional)
            </label>
            <input
              type="text"
              {...register("vinNumber")}
              placeholder="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors placeholder-gray-400"
            />
          </div>
        </div>

        {/* Document Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            Document
          </label>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-4">
              <Upload className="w-8 h-8 text-gray-400" />
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Attach important documents (e.g., registration papers) or
                </p>
                <label className="inline-block">
                  <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                    click to browse
                  </span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Upload className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="flex items-start space-x-3 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
          <div className="flex-shrink-0 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <p className="text-sm text-orange-800">
            <span className="font-semibold">100% confidential data:</span> This
            data will never be visible to buyers. It only helps us accurately
            identify your vehicle.
          </p>
        </div>
      </div>
    </div>
  );
}
