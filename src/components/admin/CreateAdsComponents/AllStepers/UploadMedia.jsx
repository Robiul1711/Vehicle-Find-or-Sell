import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Upload, AlertCircle, X } from 'lucide-react';

// Upload Field Component
const UploadField = ({ title, fieldName, accept, multiple = false, warningMessage, previewImages = false }) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const watchedFiles = watch(fieldName) || (multiple ? [] : null);
  const [preview, setPreview] = useState([]);

  // Update previews for images
  useEffect(() => {
    if (!previewImages) return;

    if (multiple && Array.isArray(watchedFiles)) {
      const urls = watchedFiles.map(file => URL.createObjectURL(file));
      setPreview(urls);
      return () => urls.forEach(url => URL.revokeObjectURL(url));
    } else if (watchedFiles && watchedFiles instanceof File) {
      const url = URL.createObjectURL(watchedFiles);
      setPreview([url]);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview([]);
    }
  }, [watchedFiles, multiple, previewImages]);

  const handleChange = (e) => {
    if (!e.target.files) return;
    const files = multiple ? Array.from(e.target.files) : e.target.files[0];
    setValue(fieldName, files);
  };

  const removeImage = (index) => {
    if (!multiple) {
      setValue(fieldName, null);
      setPreview([]);
    } else {
      const newFiles = [...watchedFiles];
      newFiles.splice(index, 1);
      setValue(fieldName, newFiles);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-900 font-medium mb-2">{title}</label>

      <div className="relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-gray-400">
        <input
          type="file"
          {...register(fieldName)}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm mb-2">Drag & drop files here or</p>
          <span
            className="text-blue-600 hover:text-blue-700 underline text-sm font-medium"
            onClick={() => document.querySelector(`input[name="${fieldName}"]`).click()}
          >
            browse
          </span>
        </div>

        {preview.length > 0 && previewImages && (
          <div className="mt-4 flex flex-wrap gap-2">
            {preview.map((url, idx) => (
              <div key={idx} className="relative w-24 h-24 rounded overflow-hidden border">
                <img src={url} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 hover:bg-red-100"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {warningMessage && (
        <div className="flex items-center gap-2 mt-2 text-sm text-orange-600">
          <AlertCircle className="w-4 h-4" />
          {warningMessage}
        </div>
      )}

      {errors[fieldName] && (
        <p className="mt-2 text-sm text-red-600">{errors[fieldName].message}</p>
      )}
    </div>
  );
};

// Main Upload Media Component
const UploadMedia = () => {
  const methods = useForm({
    defaultValues: {
      images: [],
      video: null,
      document: null,
    }
  });

  const onSubmit = (data) => console.log('Form Data:', data);

  return (
    <div className="md:p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Upload Media</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <UploadField
            title="Images"
            fieldName="images"
            accept="image/*"
            multiple={true}
            previewImages={true}
          />

          <UploadField
            title="Video"
            fieldName="video"
            accept="video/*"
            multiple={false}
            warningMessage="Your video will be published after add-on purchase."
          />

          <UploadField
            title="Documents"
            fieldName="document"
            accept=".pdf,.doc,.docx,.txt"
            multiple={true}
          />


        </form>
      </FormProvider>
    </div>
  );
};

export default UploadMedia;
