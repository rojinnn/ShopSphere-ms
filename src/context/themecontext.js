import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primary: {
      default: "bg-[#5489CB]",
      lighter: "bg-[#003580]",
      darker: "bg-[#002252]",
    },
    secondary: {
      default: "bg-[#FFB5B5]",
      lighter: "bg-[#FF9393]",
      darker: "bg-[#DB0000]",
    },
    text: {
      default: "text-black",
      lighter: "text-gray-300",
      darker: "text-gray-900",
    },
  });

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
