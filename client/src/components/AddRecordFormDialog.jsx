import React, { useState, useEffect, useContext } from "react";
import SubcategoryContext from "./context/SubcategoryContext";

const AddRecordFormDialog = ({ dialogOpen, onClose }) => {
  //for subcatecory ok
  const { showSubcategories } = useContext(SubcategoryContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  //

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("income");
  const today = new Date().toISOString().split("T")[0];
  console.log(today);
  const [categories, setCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  if (!dialogOpen) return null; // Don't render if the modal is not open

  const [incomeformData, setIncomeFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "",
    mode: "Cash",
    note: "",
  });

  const [expenseformData, setExpenseFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "",
    mode: "Cash",
    note: "",
  });

  const handleSubmitIncome = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/incomes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeformData),
      });

      if (!response.ok) throw new Error("Failed to save income");

      const data = await response.json();
      console.log("Income saved:", data);
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error saving income:", error);
    }
  };
  const handleSubmitExpense = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseformData),
      });

      console.log("my expense response is ", response);

      if (!response.ok) throw new Error("Failed to save Expense");

      const data = await response.json();
      console.log("Expense saved:", data);
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error saving Expense:", error);
    }
  };

  const handleIncomeChange = (e) => {
    setIncomeFormData({
      ...incomeformData,
      [e.target.name]: e.target.value,
    });
  };
  const handleExpenseChange = (e) => {
    setExpenseFormData({
      ...expenseformData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch income categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/incomeCategories"
        );
        const expenseCategoryResponse = await fetch(
          "http://localhost:5000/api/expenseCategories"
        );

        const data = await response.json();
        const expensedataresponse = await expenseCategoryResponse.json();
        setCategories(data); // Assuming API returns an array of categories
        setExpenseCategories(expensedataresponse);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // sucategory handling methods
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const subcategories = {
    food: ["lunch", "dinner", "eating out", "beverages"],
    transport: ["bus", "subway", "taxi", "car"],
    // Add other categories and subcategories here
  };

  return (
    <div>
      (
      <div className=" overflow-y-auto flex items-center justify-center overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full shadow-lg bg-black bg-opacity-50">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative p-4 w-full max-w-md max-h-full"
        >
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Record
              </h3>
              <button
                type="button"
                onClick={onClose} // Close modal on button click
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <ul
                  className="flex flex-nowrap -mb-px text-sm font-medium text-center"
                  role="tablist"
                >
                  {/* Income Tab */}
                  <li className="me-2 flex-shrink-0" role="presentation">
                    <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${
                        activeTab === "income"
                          ? "border-purple-600 text-purple-600"
                          : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("income")}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "income"}
                    >
                      Income
                    </button>
                  </li>

                  {/* Expense Tab */}
                  <li className="me-2 flex-shrink-0" role="presentation">
                    <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${
                        activeTab === "expense"
                          ? "border-purple-600 text-purple-600"
                          : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("expense")}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "expense"}
                    >
                      Expense
                    </button>
                  </li>

                  {/* Transfer Tab */}
                  <li className="me-2 flex-shrink-0" role="presentation">
                    <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${
                        activeTab === "transfer"
                          ? "border-purple-600 text-purple-600"
                          : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("transfer")}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "transfer"}
                    >
                      Transfer
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {/* Render Component Based on Active Tab */}
            <div>
              {activeTab === "income" && (
                <form className="p-4 md:p-5" onSubmit={handleSubmitIncome}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        value={incomeformData.date}
                        onChange={handleIncomeChange}
                        defaultValue={today}
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="amount"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999"
                        value={incomeformData.amount}
                        onChange={handleIncomeChange}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={incomeformData.category}
                        onChange={handleIncomeChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2 ">
                      <label
                        htmlFor="mode"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mode
                      </label>
                      <select
                        id="mode"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={incomeformData.mode}
                        onChange={handleIncomeChange}
                      >
                        <option value="CASH" selected>
                          Cash
                        </option>
                        <option value="CARD">Card</option>
                        <option value="UPI">UPI</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Note
                      </label>
                      <input
                        type="text"
                        name="note"
                        id="note"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type note"
                        value={incomeformData.note}
                        onChange={handleIncomeChange}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add
                  </button>
                </form>
              )}
              {/* {activeTab === "expense" && (
                <form className="p-4 md:p-5" onSubmit={handleSubmitExpense}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        value={expenseformData.date}
                        onChange={handleExpenseChange}
                        defaultValue={today}
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="amount"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999"
                        value={expenseformData.amount}
                        onChange={handleExpenseChange}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={expenseformData.category}
                        onChange={handleExpenseChange}
                      >
                        <option value="">Select category</option>
                        {expenseCategories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>

                      <select
        id="category"
        name="category"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        <option value="">Select category</option>
        {Object.keys(subcategories).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {showSubcategories && selectedCategory && (
        <select id="subcategory" name="subcategory">
          <option value="">Select subcategory</option>
          {subcategories[selectedCategory].map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
                    </div>

                    <div className="col-span-2 ">
                      <label
                        htmlFor="mode"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mode
                      </label>
                      <select
                        id="mode"
                        name="mode"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={expenseformData.mode}
                        onChange={handleExpenseChange}
                      >
                        <option value="Cash" selected>
                          Cash
                        </option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Note
                      </label>
                      <input
                        type="text"
                        name="note"
                        id="note"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type note"
                        value={expenseformData.note}
                        onChange={handleExpenseChange}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add
                  </button>
                </form>
              )} */}
              {activeTab === "expense" && (
                <form className="p-4 md:p-5" onSubmit={handleSubmitExpense}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    {/* Date Field */}
                    <div className="col-span-2">
                      <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        value={expenseformData.date}
                        onChange={handleExpenseChange}
                        defaultValue={today}
                      />
                    </div>

                    {/* Amount Field */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="amount"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999"
                        value={expenseformData.amount}
                        onChange={handleExpenseChange}
                        required
                      />
                    </div>

                    {/* Category Field */}
                    {/* Category Field */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={expenseformData.category}
                        onChange={(e) => {
                          handleExpenseChange(e);
                          // Find the category name from the ID
                          const selected = expenseCategories.find(
                            (cat) => cat._id === e.target.value
                          );
                          setSelectedCategory(selected?.categoryName || "");
                        }}
                      >
                        <option value="">Select category</option>
                        {expenseCategories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>

                      {/* Subcategory Field (Conditional Rendering) */}
                      {showSubcategories && selectedCategory && (
                        <div className="mt-2">
                          <label
                            htmlFor="subcategory"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Subcategory
                          </label>
                          <select
                            id="subcategory"
                            name="subcategory"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            onChange={handleExpenseChange}
                            value={expenseformData.subcategory || ""}
                          >
                            <option value="">Select subcategory</option>
                            {expenseCategories
                              .find(
                                (cat) => cat.categoryName === selectedCategory
                              )
                              ?.subcategories?.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                  {subcategory}
                                </option>
                              ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Mode Field */}
                    <div className="col-span-2">
                      <label
                        htmlFor="mode"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mode
                      </label>
                      <select
                        id="mode"
                        name="mode"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={expenseformData.mode}
                        onChange={handleExpenseChange}
                      >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                      </select>
                    </div>

                    {/* Note Field */}
                    <div className="col-span-2">
                      <label
                        htmlFor="note"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Note
                      </label>
                      <input
                        type="text"
                        name="note"
                        id="note"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type note"
                        value={expenseformData.note}
                        onChange={handleExpenseChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add
                  </button>
                </form>
              )}
              {activeTab === "transfer" && (
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="date"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        defaultValue={today}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="amount"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999"
                        required
                      />
                    </div>
                    <div className="col-span-2  sm:col-span-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Note
                      </label>
                      <input
                        type="text"
                        name="note"
                        id="note"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type note"
                        required
                      />
                    </div>

                    {/* for from account -  to account for money transfer */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        From Account
                      </label>
                      <select
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected>Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        To Account
                      </label>
                      <select
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected>Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      )
    </div>
  );
};

export default AddRecordFormDialog;
