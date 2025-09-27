import React, { useState } from "react";
import { Pencil } from "lucide-react";
import BasicDetails from "./BasicDetails";
import RegistrationNumber from "./RegistrationNumber";

// Sample modal component
const EditModal = ({ open, onClose, section }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-11/12 max-w-3xl rounded-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Edit {section}</h2>
        {/* Here you can render your form for that specific section */}
        <RegistrationNumber />
        <p>Edit form for <strong>{section}</strong> goes here.</p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, content, sectionKey, onEdit }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      <Pencil
        className="w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer"
        onClick={() => onEdit(sectionKey)}
      />
    </div>
    <div className="text-gray-900">{content}</div>
  </div>
);

const Preview = () => {
  const [editingSection, setEditingSection] = useState(null);

  const handleEdit = (sectionKey) => {
    setEditingSection(sectionKey);
  };

  const closeModal = () => {
    setEditingSection(null);
  };

  return (
    <div className="p-6 ">
      {/* Basic Details */}
      <Section
        title="Basic Details"
        content={
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Brand:</strong> BMW</div>
            <div><strong>Model:</strong> BMW X5</div>
            <div><strong>Price:</strong> $25,00,000</div>
            <div><strong>Color:</strong> Black</div>
            {/* Add all other details */}
          </div>
        }
        sectionKey="basicDetails"
        onEdit={handleEdit}
      />

      {/* Features */}
      <Section
        title="Features"
        content={
          <div className="grid grid-cols-4 gap-2">
            <span>4-wheel drive</span>
            <span>Leather Seats</span>
            <span>Airbags</span>
            <span>Bluetooth</span>
            {/* Render all features */}
          </div>
        }
        sectionKey="features"
        onEdit={handleEdit}
      />

      {/* Engine & Transmission */}
      <Section
        title="Engine & Transmission Spaces"
        content={
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Fuel Tank Capacity:</strong> 65 L</div>
            <div><strong>Max Towing Weight:</strong> 1000 kg</div>
            {/* Add other details */}
          </div>
        }
        sectionKey="engine"
        onEdit={handleEdit}
      />

      {/* Upload Media */}
      <Section
        title="Upload Media"
        content={
          <div className="space-y-2">
            <div className="flex gap-2">
              {[...Array(6)].map((_, idx) => (
                <img
                  key={idx}
                  src="/path-to-image.jpg"
                  alt="car"
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
            <a href="/path-to-doc.pdf" className="text-blue-600 underline text-sm">Car-Brochure.pdf</a>
          </div>
        }
        sectionKey="media"
        onEdit={handleEdit}
      />

      {/* Seller Address */}
      <Section
        title="Seller Address"
        content="1456 Vestri Drive, Anchorage, AK 99502"
        sectionKey="sellerAddress"
        onEdit={handleEdit}
      />

      {/* Contact Information */}
      <Section
        title="Contact Information"
        content={
          <div>
            <div><strong>Name:</strong> Patricia Sanders</div>
            <div><strong>Email:</strong> dennis416@gmail.com</div>
            <div><strong>Contact:</strong> (617) 623-2338</div>
            <div><strong>WhatsApp:</strong> (618) 474-9169</div>
          </div>
        }
        sectionKey="contact"
        onEdit={handleEdit}
      />

      {/* Modal */}
      <EditModal
        open={!!editingSection}
        onClose={closeModal}
        section={editingSection}
      />
    </div>
  );
};

export default Preview;
