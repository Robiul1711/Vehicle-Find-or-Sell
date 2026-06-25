import React from "react";
import logo from "@/assets/images/logo1.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApiQuery } from "@/hooks/useApiQuery";

const Footer = () => {
  
  const selectedLanguage = localStorage.getItem("selectedLanguage") || "fr";
  const { data } = useApiQuery({
    queryKey: ["footer"],
    url: "/cms/footer/",
  });

  const footerData = data?.data;

  const getSocialIcon = (platform, logoUrl) => {
    switch (platform?.toLowerCase()) {
      case "facebook": return <FaFacebookF className="w-4 h-4" />;
      case "twitter": return <FaTwitter className="w-4 h-4" />;
      case "instagram": return <FaInstagram className="w-4 h-4" />;
      case "linkedin": return <FaLinkedinIn className="w-4 h-4" />;
      default: return logoUrl ? <img src={logoUrl} alt={platform} className="w-4 h-4 object-contain" /> : <FaFacebookF className="w-4 h-4" />;
    }
  };

  return (
    <footer className="section-padding-x pt-10 sm:pt-12 md:pt-16 lg:pt-20 pb-6 sm:pb-8  bg-bg-custom text-white">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pb-8 border-b border-white/10">
        {/* Logo */}
        <img src={footerData?.logo_url || logo} alt="Logo" className="w-36 sm:w-40 md:w-44 lg:w-48 object-contain" />

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to={"/"} className="hover:text-gray-300 cursor-pointer">

         {selectedLanguage === "fr" ? "Accueil" : "Home" }</Link>
          <Link to={"/listings"} className="hover:text-gray-300 cursor-pointer">Browse Listings</Link>
          <Link to={"/blog"} className="hover:text-gray-300 cursor-pointer">Blog</Link>
          <Link to={"/contact"} className="hover:text-gray-300 cursor-pointer">Contact Us</Link>
          <Link to={"/dealers"} className="hover:text-gray-300 cursor-pointer">Dealers</Link>
        </ul>

        {/* Social Links */}
        <div className="flex gap-4">
          {footerData?.social_links?.length > 0 ? (
            footerData.social_links.map((social) => (
              social.is_active && (
                <a
                  key={social.id}
                  href={social.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-custom-primary hover:text-white duration-300 hover:bg-custom-primary transition"
                >
                  {getSocialIcon(social.platform, social.logo_url)}
                </a>
              )
            ))
          ) : (
            <>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-custom-primary hover:text-white duration-300 hover:bg-custom-primary transition">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-custom-primary hover:text-white duration-300 hover:bg-custom-primary transition">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-custom-primary hover:text-white duration-300 hover:bg-custom-primary transition">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-custom-primary hover:text-white duration-300 hover:bg-custom-primary transition">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center pt-6 gap-6 text-sm text-gray-400">
        <ul className="flex flex-wrap gap-4 justify-center">

          <li className="hover:text-white cursor-pointer">
            <Link to={'/term-and-conditions'}>
              Terms and Conditions
            </Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to={'/legal-notice'}>
              Legal Notices
            </Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to={'/cookie-policy'}>
              Cookie Policy
            </Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to={'/personal-data-protection-policy'}>
              Personal Data Protection Policy
            </Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to='/term-of-use'>
              TOU
            </Link>
          </li>
        </ul>
        <p className="text-center lg:text-right">
          {footerData?.copyright_text || `©${new Date().getFullYear()} ronpoin.fr. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
