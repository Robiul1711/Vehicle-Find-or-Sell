import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import { Link } from 'react-router-dom';
import CommonButton from '@/components/common/CommonButton';
import { CompareIcon } from '@/components/common/SVGicons/MySvg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/listings", text: "Browse Listings" },
    { to: "/blog", text: "Blog" },
    { to: "/dealers", text: "Dealers" },
    { to: "/services", text: "Additional Services" },
    { to: "/contact", text: "Contact Us" }
  ];

  return (
    <>
      <header className={`w-full transition-all duration-300 fixed top-0 left-0 z-40 ${
        isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-md'
      } border-b border-gray-200 dark:border-gray-800`}>
        <div className="section-padding-x">
          <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="Logo" className="" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {navLinks.map(link => (
                <Link 
                  key={link.text} 
                  to={link.to} 
                  className="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
                >
                  {link.text}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <CommonButton>Sign In</CommonButton>
              <CommonButton>Sign Up</CommonButton>
              <CommonButton variant="primary" className="group">
                <CompareIcon className="text-custom-primary group-hover:text-white" />
              </CommonButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
         <CommonButton 
              variant="primary" 
              
              className="group px-2  "
              onClick={() => setIsMenuOpen(false)}
            >
              <CompareIcon className="text-custom-primary group-hover:text-white  size-4" />
            
            </CommonButton>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className=" p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 rounded-md transition-colors" 
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`
          absolute top-0 left-0 h-full w-80 max-w-full bg-white  shadow-xl transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 ">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="Logo" className="h-8" />
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100  rounded-md"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="p-6">
            <ul className="">
              {navLinks.map(link => (
                <li key={link.text}>
                  <Link 
                    to={link.to} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 text-lg font-medium text-gray-700  hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Buttons */}
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <CommonButton 
              fullWidth 
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </CommonButton>
            <CommonButton 
              fullWidth 
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </CommonButton>
   
          </div>
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind fixed navbar */}
      <div className="h-14 sm:h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;