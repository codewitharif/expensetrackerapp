import React, { createContext, useState, useEffect } from "react";

const SubcategoryContext = createContext();

export const SubcategoryProvider = ({ children }) => {
  // Retrieve the state from localStorage or default to false
  const storedValue = localStorage.getItem("showSubcategories");
  const initialValue = storedValue ? JSON.parse(storedValue) : false;

  const [showSubcategories, setShowSubcategories] = useState(initialValue);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "showSubcategories",
      JSON.stringify(showSubcategories)
    );
  }, [showSubcategories]);

  return (
    <SubcategoryContext.Provider
      value={{ showSubcategories, setShowSubcategories }}
    >
      {children}
    </SubcategoryContext.Provider>
  );
};

export default SubcategoryContext;
