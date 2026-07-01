
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "px-2 py-2 sm:px-5 sm:py-2 md:px-7 border border-custom-primary rounded-md hover:bg-custom-primary/10 hover:text-black text-white text-sm sm:text-base  bg-custom-primary ",
  secondary:
    "bg-Secondary-light hover:bg-Secondary/80 hover:text-white hover:border hover:bg-transparent bg-white text-black  border rounded-md px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base md:px-7 md:py-3 md:text-base",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

const CommonButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  link = null,
  ...props
}) => {
  const buttonClasses = cn(
    "py-2  px-3 md:px-6 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2",
    variants[variant] || variants.primary,
    (disabled || isLoading) && "opacity-60 cursor-not-allowed",
    fullWidth && "w-full",
    className
  );

  if (link) {
    return (
      <Link to={link} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-inherit"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default CommonButton;
