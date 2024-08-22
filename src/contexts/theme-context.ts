import { createContext } from "react";

type ThemeValueType = {
    theme: string;
    toggleTheme: () => void;
  }

const ThemeContext = createContext<ThemeValueType | undefined>(undefined);

export default ThemeContext;