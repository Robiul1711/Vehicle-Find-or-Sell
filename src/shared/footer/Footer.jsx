import React from "react";
import logo from "@/assets/images/logo1.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
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
      case "facebook":
        return <FaFacebookF className="w-4 h-4" />;
      case "twitter":
        return <FaTwitter className="w-4 h-4" />;
      case "instagram":
        return <FaInstagram className="w-4 h-4" />;
      case "linkedin":
        return <FaLinkedinIn className="w-4 h-4" />;
      default:
        return logoUrl ? (
          <img
            src={logoUrl}
            alt={platform}
            className="w-4 h-4 object-contain"
          />
        ) : (
          <FaFacebookF className="w-4 h-4" />
        );
    }
  };

  const universeLinks = [
    { name: "labonneroute.fr", url: "https://labonneroute.fr" },
    { name: "passionyoungtimer.fr", url: "https://passionyoungtimer.fr" },
    { name: "passionsportives.fr", url: "https://passionsportives.fr" },
    { name: "autoannonces.fr", url: "https://autoannonces.fr" },
    { name: "petitesannoncesauto.fr", url: "https://petitesannoncesauto.fr" },
    { name: "berline-occasion.fr", url: "https://berline-occasion.fr" },
    { name: "break-occasion.fr", url: "https://break-occasion.fr" },
    { name: "cabriolet-occasion.fr", url: "https://cabriolet-occasion.fr" },
    { name: "citadine-occasion.fr", url: "https://citadine-occasion.fr" },
    { name: "lemonospace.fr", url: "https://lemonospace.fr" },
    { name: "suv-familial.fr", url: "https://suv-familial.fr" },
    { name: "suv-occasions.fr", url: "https://suv-occasions.fr" },
    { name: "motos-occasion.fr", url: "https://motos-occasion.fr" },
    { name: "scooter-occasion.fr", url: "https://scooter-occasion.fr" },
  ];

  return (
    <footer className="section-padding-x pt-12 md:pt-16 lg:pt-20 pb-6 sm:pb-8 bg-bg-custom text-white">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start">
        {/* Column 1: Logo & Socials */}
        <div className="lg:col-span-3 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={footerData?.logo_url || logo}
            alt="Logo"
            className="w-36 sm:w-40 md:w-44 lg:w-48 object-contain"
          />
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            {selectedLanguage === "fr"
              ? "Le seul rond-point qui mène à la bonne route. Achetez et vendez votre véhicule en toute confiance."
              : "The only roundabout that leads to the right road. Buy and sell your vehicle with confidence."}
          </p>
          <div className="flex gap-4">
            {footerData?.social_links?.length > 0 ? (
              footerData.social_links.map(
                (social) =>
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
                  ),
              )
            ) : (
              <>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-custom-primary hover:text-white duration-300 hover:bg-custom-primary transition"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-custom-primary hover:text-white duration-300 hover:bg-custom-primary transition"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-custom-primary hover:text-white duration-300 hover:bg-custom-primary transition"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-custom-primary hover:text-white duration-300 hover:bg-custom-primary transition"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="lg:col-span-3 flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-base font-bold tracking-wider uppercase text-gray-200 border-b-2 border-custom-primary pb-1">
            {selectedLanguage === "fr" ? "Navigation" : "Quick Links"}
          </h4>
          <ul className="flex flex-col gap-3 text-sm font-medium text-center md:text-left">
            <Link to={"/"} className="hover:text-gray-300 cursor-pointer notranslate">
              {selectedLanguage === "fr" ? "Accueil" : "Home"}
            </Link>
            <Link to={"/listings"} className="hover:text-gray-300 cursor-pointer">
              Browse Listings
            </Link>
            <Link to={"/blog"} className="hover:text-gray-300 cursor-pointer">
              Blog
            </Link>
            <Link to={"/faq"} className="hover:text-gray-300 cursor-pointer notranslate">
              FAQ
            </Link>
            <Link to={"/contact"} className="hover:text-gray-300 cursor-pointer">
              Contact Us
            </Link>
            <Link to={"/dealers"} className="hover:text-gray-300 cursor-pointer capitalize notranslate">
              {selectedLanguage === "fr" ? "Concessionnaires" : "Dealers"}
            </Link>
          </ul>
        </div>

        {/* Column 3: Our Universes */}
        <div className="lg:col-span-6 flex flex-col items-center md:items-start space-y-4 w-full">
          <h4 className="text-base font-bold tracking-wider uppercase text-gray-200 border-b-2 border-custom-primary pb-1">
            {selectedLanguage === "fr" ? "Nos Univers" : "Our Universes"}
          </h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm w-full text-center md:text-left">
            {universeLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-custom-secondary transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center pt-6 gap-6 text-sm text-gray-400">
        <ul className="flex flex-wrap gap-4 justify-center">
          <li className="hover:text-white cursor-pointer">
            <Link to={"/term-and-conditions"}>Terms and Conditions</Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to={"/legal-notice"}>Legal Notices</Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to={"/cookie-policy"}>Cookie Policy</Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to={"/personal-data-protection-policy"}>
              Personal Data Protection Policy
            </Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to="/term-of-use">TOU</Link>
          </li>
        </ul>
        <p className="text-center lg:text-right">
          {footerData?.copyright_text ||
            `©${new Date().getFullYear()} ronpoin.fr. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
