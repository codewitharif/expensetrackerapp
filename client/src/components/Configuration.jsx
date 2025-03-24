import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CurrencyContext from "./context/CurrencyContext";
import ColorSettingContext from "./context/ColorSettingContext";
import SubcategoryContext from "./context/SubcategoryContext";

const Configuration = () => {
  const { currency, setCurrency, supportedCurrencies } =
    useContext(CurrencyContext);
  const { colors, updateColors } = useContext(ColorSettingContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showSubcategories, setShowSubcategories } =
    useContext(SubcategoryContext);

  // Handle loading state
  if (!supportedCurrencies || supportedCurrencies.length === 0) {
    return <div>Loading currencies...</div>;
  }

  // Handle color scheme selection
  const handleColorSchemeChange = (scheme) => {
    if (scheme === "A") {
      updateColors("green", "red"); // Set A: Income Green, Expense Red
    } else if (scheme === "B") {
      updateColors("blue", "red"); // Set B: Income Blue, Expense Red
    }
    setIsModalOpen(false); // Close the modal after selection
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white w-[90%] max-w-md rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Category</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center border-b pb-2">
              <Link to="/settings/configuration/income-category">
                <span className="text-gray-600">Income Category Setting</span>
              </Link>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <Link to="/settings/configuration/expense-category">
                <span className="text-gray-600">Expenses Category Setting</span>
              </Link>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Subcategory</span>
              <span className="text-red-500 font-semibold">
                <input
                  type="checkbox"
                  checked={showSubcategories}
                  onChange={(e) => setShowSubcategories(e.target.checked)}
                />
              </span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <Link to="/settings/configuration/expense-subcategory">
                <span className="text-gray-600">Manage Subcategory</span>
              </Link>
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-4">
            Configuration
          </h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Main Currency Setting</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {supportedCurrencies.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Budget Setting</span>
            </li>

            <li
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="text-gray-600">
                Income Expense Color Setting
              </span>
              <span className="text-red-500 font-semibold">
                {colors.incomeColor === "green" ? "Set A" : "Set B"}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Color Setting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Income Expense Color Setting
            </h2>
            <p className="text-gray-600 mb-4">
              By default, income will show in green and expense in red. You can
              customize it below:
            </p>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="colorScheme"
                  value="A"
                  checked={colors.incomeColor === "green"}
                  onChange={() => handleColorSchemeChange("A")}
                />
                <span>Set A: Income Green, Expense Red</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="colorScheme"
                  value="B"
                  checked={colors.incomeColor === "blue"}
                  onChange={() => handleColorSchemeChange("B")}
                />
                <span>Set B: Income Blue, Expense Red</span>
              </label>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuration;
