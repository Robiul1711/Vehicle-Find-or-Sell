import React, { useState, useEffect, useRef } from "react";
import CommonButton from "./CommonButton";
import { CompareIcon } from "./SVGicons/MySvg";
import { TbArrowsDownUp } from "react-icons/tb";
import Title from "./Title";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useDebounce } from "@/hooks/useDebounce";

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
        {trigger(isOpen)}
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-72 sm:w-96 rounded-xl shadow-xl bg-white z-50 p-4 border sm:p-8"
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
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);
  const [selectedId1, setSelectedId1] = useState(null);
  const [selectedId2, setSelectedId2] = useState(null);

  const debouncedValue1 = useDebounce(value1, 500);
  const debouncedValue2 = useDebounce(value2, 500);

  const { data: results1 } = useApiQuery({
    queryKey: ["ads-search", 1, debouncedValue1],
    url: "/ads/compare/search/",
    params: { q: debouncedValue1 },
    enabled: !!debouncedValue1 && debouncedValue1.length >= 2,
  });

  const { data: results2 } = useApiQuery({
    queryKey: ["ads-search", 2, debouncedValue2],
    url: "/ads/compare/search/",
    params: { q: debouncedValue2 },
    enabled: !!debouncedValue2 && debouncedValue2.length >= 2,
  });

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  // console.log("results1", results1, "results2", results2);

  const handleSelect1 = (item) => {
    setValue1(item.title);
    setSelectedId1(item.id);
    setShowSuggestions1(false);
    setError1("");
  };

  const handleSelect2 = (item) => {
    setValue2(item.title);
    setSelectedId2(item.id);
    setShowSuggestions2(false);
    setError2("");
  };

  const handleCompare = () => {
    let hasError = false;
    if (!value1) {
      setError1("Field is required");
      hasError = true;
    } else {
      setError1("");
    }

    if (!value2) {
      setError2("Field is required");
      hasError = true;
    } else {
      setError2("");
    }

    if (!hasError) {
      // console.log("Comparing", value1, "and", value2);
      // Logic for comparison can go here
    }
  };

  return (
    <div className="flex items-center justify-center font-sans">
      <DropdownMenu
        trigger={(isOpen) => (
          <button
            className={` px-2 py-1 hover:bg-custom-primary rounded-sm group border border-custom-primary md:px-3 md:py-2 ${
              isOpen
                ? "bg-custom-primary text-white hover:bg-custom-primary"
                : ""
            }`}
          >
            <CompareIcon
              className={`size-4 sm:size-5.5 ${
                isOpen ? "" : "text-custom-primary group-hover:text-white"
              }`}
            />
          </button>
        )}
      >
        <div className="">
          <Title level="title24">Product Comparison</Title>
          <Title level="title14" className="mb-5">
            You have not chosen any products to compare.
          </Title>
        </div>
        <div className="flex flex-col gap-3">
          {/* Input 1 */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter first item"
              value={value1}
              onChange={(e) => {
                setValue1(e.target.value);
                setSelectedId1(null);
                setShowSuggestions1(true);
                if (e.target.value) setError1("");
              }}
              onFocus={() => setShowSuggestions1(true)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                error1 ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-custom-primary"
              }`}
            />
            {error1 && <p className="text-xs text-red-500 mt-1">{error1}</p>}
            {showSuggestions1 && results1?.length > 0 && (
              <div className="absolute z-20 w-full bg-white shadow-xl rounded-md border mt-1 max-h-60 overflow-y-auto">
                {results1.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-0"
                    onClick={() => handleSelect1(item)}
                  >
                    <span className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <TbArrowsDownUp className="w-6 h-6 text-custom-primary self-center" />

          {/* Input 2 */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter second item"
              value={value2}
              onChange={(e) => {
                setValue2(e.target.value);
                setSelectedId2(null);
                setShowSuggestions2(true);
                if (e.target.value) setError2("");
              }}
              onFocus={() => setShowSuggestions2(true)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                error2 ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-custom-primary"
              }`}
            />
            {error2 && <p className="text-xs text-red-500 mt-1">{error2}</p>}
            {showSuggestions2 && results2?.length > 0 && (
              <div className="absolute z-20 w-full bg-white shadow-xl rounded-md border mt-1 max-h-60 overflow-y-auto">
                {results2.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-0"
                    onClick={() => handleSelect2(item)}
                  >
                    <span className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <CommonButton
            link={selectedId1 && selectedId2 ? `/compare?id1=${selectedId1}&id2=${selectedId2}` : null}
            variant="primary"
            className="w-full"
            onClick={handleCompare}
          >
            Compare
          </CommonButton>
        </div>
      </DropdownMenu>
    </div>
  );
}
