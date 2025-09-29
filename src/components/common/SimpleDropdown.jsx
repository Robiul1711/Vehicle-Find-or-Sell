import React, { useState, useEffect, useRef } from "react";
import CommonButton from "./CommonButton";
import { CompareIcon } from "./SVGicons/MySvg";
import { TbArrowsDownUp } from "react-icons/tb";
import Title from "./Title";

const DropdownMenu = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTriggerClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={handleTriggerClick} className="cursor-pointer">
        {/* Pass isOpen to trigger so it can style itself */}
        {trigger(isOpen)}
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-96 rounded-xl shadow-xl bg-white z-50 p-8"
          role="menu"
          aria-orientation="vertical"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default function SimpleDropdown() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const handleCompare = () => {
    if (value1 && value2) {
      alert(`Comparing "${value1}" with "${value2}"`);
    } else {
      alert("Please fill both inputs before comparing.");
    }
  };

  return (
    <div className="flex items-center justify-center font-sans">
      <DropdownMenu
        trigger={(isOpen) => (
          <CommonButton
            variant={isOpen ? "secondary" : "primary"} // 👈 change style when open
            className={`group ${isOpen ? "bg-custom-primary text-white hover:bg-custom-primary" : ""}`}
          >
            <CompareIcon
              className={`size-5.5 ${
                isOpen
                  ? ""
                  : "text-custom-primary group-hover:text-white"
              }`}
            />
          </CommonButton>
        )}
      >
        <Title level="title24">Product Comparison</Title>
        <Title level="title14" className="mb-5">
          You have not chosen any products to compare.
        </Title>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Enter first item"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-primary"
          />
          <TbArrowsDownUp className="w-6 h-6 text-custom-primary self-center" />
          <input
            type="text"
            placeholder="Enter second item"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-primary"
          />
          <CommonButton
            variant="primary"
            onClick={handleCompare}
            className="w-full"
          >
            Compare
          </CommonButton>
        </div>
      </DropdownMenu>
    </div>
  );
}
