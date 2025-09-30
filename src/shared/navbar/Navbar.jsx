import { useState, useEffect } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import CommonButton from "@/components/common/CommonButton";
import { CompareIcon } from "@/components/common/SVGicons/MySvg";
import SimpleDropdown from "@/components/common/SimpleDropdown";
import LanguageArea from "@/components/common/LanguageArea";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/listings", text: "Browse Listings" },
    { to: "/blog", text: "Blog" },
    { to: "/dealers", text: "Dealers" },
    { to: "/services", text: "Additional Services" },
    { to: "/contact", text: "Contact Us" },
  ];

  // Check if a link is active
  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`w-full transition-all duration-300  top-0 left-0 z-40 sticky ${
          isScrolled
            ? "bg-white/65 backdrop-blur-lg shadow-lg"
            : "bg-white/90 backdrop-blur-md"
        } `}
      >
        <div className="section-padding-x">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="Logo" className="" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.to);
                return (
                  <Link
                    key={link.text}
                    to={link.to}
                    className={`text-sm lg:text-base font-medium transition-colors relative group ${
                      isActive
                        ? "text-gray-900 font-semibold"
                        : "text-gray-800 hover:text-gray-900"
                    }`}
                  >
                    {link.text}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        isActive ? "w-full bg-gray-900" : "w-0 bg-gray-900"
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <CommonButton link="/auth">Sign In</CommonButton>
              <LanguageArea />
              <SimpleDropdown />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <SimpleDropdown />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600  hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
        fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out
        ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`
          absolute top-0 left-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-3 border-b border-gray-200">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="Logo" className="h-16" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 rounded-md"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="p-2">
            <ul className="">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.to);
                return (
                  <li key={link.text}>
                    <Link
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-gray-100 text-gray-900 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {link.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Buttons */}
          <div className="absolute bottom-6 flex items-center justify-between  left-6 right-6 ">
            <LanguageArea />
            <Link to="/auth">
              <CommonButton fullWidth onClick={() => setIsMenuOpen(false)}>
                Sign In
              </CommonButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
