import React from "react";
import logo from "@/assets/images/logo.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="section-padding-x section-padding-y bg-bg-custom text-white">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pb-8 border-b border-white/10">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-24" />

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <li className="hover:text-gray-300 cursor-pointer">About Us</li>
          <li className="hover:text-gray-300 cursor-pointer">Browse Listings</li>
          <li className="hover:text-gray-300 cursor-pointer">Blog</li>
          <li className="hover:text-gray-300 cursor-pointer">Contact Us</li>
          <li className="hover:text-gray-300 cursor-pointer">Dealers</li>
        </ul>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="#"
            className="p-3 rounded-full bg-white text-custom-primary hover:text-white duration-300  hover:bg-custom-primary transition"
          >
            <FaFacebookF className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white text-custom-primary hover:text-white duration-300  hover:bg-custom-primary transition"
          >
            <FaTwitter className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white text-custom-primary hover:text-white duration-300  hover:bg-custom-primary transition"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white text-custom-primary hover:text-white duration-300  hover:bg-custom-primary transition"
          >
            <FaLinkedinIn className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center pt-6 gap-6 text-sm text-gray-400">
        <ul className="flex flex-wrap gap-4 justify-center">
          <li className="hover:text-white cursor-pointer">Terms and Conditions</li>
          <li className="hover:text-white cursor-pointer">Legal Notices</li>
          <li className="hover:text-white cursor-pointer">Cookie Policy</li>
          <li className="hover:text-white cursor-pointer">
            Personal Data Protection Policy
          </li>
          <li className="hover:text-white cursor-pointer">TOU</li>
        </ul>
        <p className="text-center lg:text-right">
          © 2025 labonneroute.fr. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
