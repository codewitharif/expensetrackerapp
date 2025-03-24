import React, { createContext, useState, useEffect } from "react";

const ColorSettingContext = createContext();

export const ColorSettingProvider = ({ children }) => {
  // Default color settings
  const defaultColors = {
    incomeColor: "green",
    expenseColor: "red",
  };

  // Load color settings from localStorage or use defaults
  const [colors, setColors] = useState(() => {
    const savedColors = localStorage.getItem("colorSettings");
    return savedColors ? JSON.parse(savedColors) : defaultColors;
  });

  // Save color settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("colorSettings", JSON.stringify(colors));
  }, [colors]);

  // Function to update color settings
  const updateColors = (incomeColor, expenseColor) => {
    setColors({ incomeColor, expenseColor });
  };

  return (
    <ColorSettingContext.Provider value={{ colors, updateColors }}>
      {children}
    </ColorSettingContext.Provider>
  );
};

export default ColorSettingContext;
