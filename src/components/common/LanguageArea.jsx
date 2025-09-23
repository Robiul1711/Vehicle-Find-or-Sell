import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
// --- Helper Function to manage the Google Translate cookie ---
const setGoogleTranslateCookie = (langCode) => {
  const cookieName = "googtrans";
  const cookieValue = `/en/${langCode}`;
  document.cookie = `${cookieName}=${cookieValue}; path=/`;
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = `${cookieName}=${cookieValue}; path=/`;
};

const LanguageArea = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  // Effect: load Google Translate script once
  useEffect(() => {
    if (window.googleTranslateElementInit) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Effect: run translation when language changes
  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
    document.documentElement.lang = selectedLanguage;
    setGoogleTranslateCookie(selectedLanguage);

    const intervalId = setInterval(() => {
      const selectElement = document.querySelector(".goog-te-combo");
      if (selectElement) {
        selectElement.value = selectedLanguage;
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [selectedLanguage]);

  const changeLanguage = (langCode) => {
    if (selectedLanguage !== langCode) {
      setSelectedLanguage(langCode);
      window.location.reload();
    }
  };

  return (
    <div className="relative inline-block">
      {/* Hidden Google Translate container */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Custom Select */}
      <select
        value={selectedLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="appearance-none bg-white border border-custom-primary rounded-md px-3 py-2 hover:bg-custom-primary hover:text-white pr-8 shadow-md "
      >
        <option value="en">
          🇬🇧 English
        </option>
        <option value="fr">
          fr Franch
        </option>
      </select>

      {/* Custom dropdown arrow */}
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
     <FaAngleDown />
      </span>
    </div>
  );
};

export default LanguageArea;
