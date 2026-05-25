import React from "react";
import { useFormContext } from "react-hook-form";
import { UploadCloud, File as FileIcon, X, GripVertical } from "lucide-react";
// DND Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// --- Sortable Item Component ---
const SortablePhoto = ({ file, idx, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: file.id || idx }); // Use unique ID or index

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  let src = "";
  if (file instanceof File) {
    src = URL.createObjectURL(file);
  } else if (file?.file) {
    src = file.file;
  } else if (typeof file === "string") {
    src = file;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group border rounded-md overflow-hidden bg-white"
    >
      <img src={src} alt="preview" className="w-full h-24 object-cover" />
      
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"
      >
        <GripVertical className="text-white" />
      </div>

      {/* Remove Button */}
      <button
        type="button"
        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 z-20 hover:bg-red-500"
        onClick={() => onRemove(idx)}
      >
        <X size={14} />
      </button>

      {/* Badge for Order */}
      <div className="absolute bottom-1 left-1 bg-custom-primary text-[10px] text-white px-1 rounded">
        {idx + 1}
      </div>
    </div>
  );
};

// --- Main Component ---
const UploadMedia = () => {
  const { setValue, watch } = useFormContext();
  const images = watch("images") || [];
  const videos = watch("videos") || [];

  // Sensors for Drag and Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Add a unique ID to each file to help DND-kit track them
    const filesWithId = files.map(file => {
        file.id = Math.random().toString(36).substr(2, 9);
        return file;
    });
    const updated = [...images, ...filesWithId];
    setValue("images", updated, { shouldValidate: true });
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setValue("images", updated);
  };

  // Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img, idx) => (img.id || idx) === active.id);
      const newIndex = images.findIndex((img, idx) => (img.id || idx) === over.id);

      const reorderedImages = arrayMove(images, oldIndex, newIndex);
      setValue("images", reorderedImages);
    }
  };

  // ... Video functions remain same ...
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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Upload Media</h2>

      <div>
        <h3 className="font-medium mb-1">Images <span className="text-gray-500 text-xs">(Required)</span></h3>
        <p className="text-xs text-gray-400 mb-3">Drag and drop photos to change their order. The first photo will be the main cover.</p>
        
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-custom-primary transition-colors mb-4">
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
          <UploadCloud className="w-6 h-6 text-gray-400" />
          <p className="text-sm text-gray-500">
            <span className="text-custom-primary font-medium">Click to browse</span>
          </p>
        </label>

        {/* Sortable Context */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((img, idx) => img.id || idx)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {images.map((file, idx) => (
                <SortablePhoto
                  key={file.id || idx}
                  file={file}
                  idx={idx}
                  onRemove={removeImage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Video Section */}
      <div>
        <h3 className="font-medium mb-2">Video</h3>
        <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-custom-primary transition-colors">
          <input type="file" accept="video/*" multiple className="hidden" onChange={handleVideoChange} />
          <UploadCloud className="w-6 h-6 text-gray-400" />
          <p className="text-sm text-gray-500"><span className="text-custom-primary">Click to browse</span></p>
        </label>

        {videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {videos.map((file, idx) => {
              const src = file instanceof File ? URL.createObjectURL(file) : (file?.file || file);
              return (
                <div key={idx} className="relative group border rounded-md overflow-hidden bg-black">
                  <video controls className="w-full h-40 object-contain" src={src} />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeVideo(idx)}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-2 text-[10px] text-orange-500 flex items-center gap-1">
          <FileIcon size={12} /> Uploaded videos appear after ad-on purchase.
        </p>
      </div>
    </div>
  );
};

export default UploadMedia;