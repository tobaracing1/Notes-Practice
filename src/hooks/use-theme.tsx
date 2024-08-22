import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "@/contexts/theme-context";

interface Props {
  children: React.ReactNode;
}


const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    if(typeof window !== undefined){
        localStorage.setItem("theme", theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      if(newTheme === "dark"){
        document.documentElement.classList.add("dark");
      }else{
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const ThemeValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={ThemeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
    const themeCtx = useContext(ThemeContext);

    if (!themeCtx) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return themeCtx;
}