import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  outline?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  outline = false,
  disabled = false,
  loading = false,
  className = "",
}) => {
  const navigate = useNavigate();

  const handlePress = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (href) {
      event.preventDefault();
      navigate(href);
    } else if (onClick) {
      onClick(event);
    }
  };

  const baseClassName =
    "rounded-xl px-5 py-2.5 transition-all duration-300 border border-transparent font-medium justify-center flex items-center focus:outline-none focus:ring-2 focus:ring-primary-brand focus:ring-opacity-50";

  const outlineClassName = outline
    ? `${
        disabled
          ? "border-primary-grey opacity-85  bg-secondary-background"
          : "border-primary-brand bg-transparent hover:bg-primary-brand hover:text-primary-background text-primary-brand"
      }`
    : "";

  const solidClassName = !outline
    ? `${
        disabled
          ? "bg-secondary-background opacity-85"
          : "bg-primary-brand text-primary-background hover:bg-transparent hover:border-primary-brand hover:text-primary-brand"
      }`
    : "";

  return (
    <button
      className={`${baseClassName} ${outlineClassName} ${solidClassName} ${className} `}
      onClick={handlePress}
      disabled={disabled}
    >
      {loading ? <FaSpinner className="animate-spin" size={22} /> : children}
    </button>
  );
};

export default Button;
