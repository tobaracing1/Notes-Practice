import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { FaMoon, FaSun } from "react-icons/fa";

const ButtonTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-12 h-12 transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg "
    >
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ButtonTheme;
