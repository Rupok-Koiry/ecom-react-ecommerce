import React, { useState, useEffect } from "react";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { LuMoonStar, LuSun } from "react-icons/lu";
import { ThemeTypes } from "../constants/types";

const ThemeButton: React.FC = () => {
  const [theme, setTheme] = useState<ThemeTypes>(() => {
    // Initialize theme from local storage or default to 'system'
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as ThemeTypes) || "system";
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Apply the theme when it changes and save to local storage
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // For 'system', check user's preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const setThemeOption = (newTheme: ThemeTypes) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-primary-background text-primary-orange font-medium rounded-md focus:outline-none"
      >
        {theme === "light" ? (
          <LuSun size={20} />
        ) : theme === "dark" ? (
          <LuMoonStar size={20} />
        ) : (
          <HiOutlineComputerDesktop size={20} />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-primary-white rounded-md shadow-lg">
          <button
            onClick={() => setThemeOption("light")}
            className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-primary-background font-medium ${
              theme === "light"
                ? "bg-secondary-background text-primary-orange"
                : "text-primary-text"
            }`}
          >
            <LuSun size={20} />
            Light
          </button>
          <button
            onClick={() => setThemeOption("dark")}
            className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-primary-background font-medium ${
              theme === "dark"
                ? "bg-secondary-background text-primary-orange"
                : "text-primary-text"
            }`}
          >
            <LuMoonStar size={20} />
            Dark
          </button>
          <button
            onClick={() => setThemeOption("system")}
            className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-primary-background font-medium ${
              theme === "system"
                ? "bg-secondary-background text-primary-orange"
                : "text-primary-text"
            }`}
          >
            <HiOutlineComputerDesktop size={20} />
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeButton;
