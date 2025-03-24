import React, { useState, useEffect } from "react";

const ExpenseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const API_URL = "http://localhost:5000/api/expenseCategories";

  // Fetch all categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: newCategory }),
      });

      if (response.ok) {
        const addedCategory = await response.json();
        setCategories([...categories, addedCategory]);

        setNewCategory("");
      } else {
        console.error("Error adding category:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle updating a category
  const handleSave = async (id, newName) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: newName }),
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        setCategories(
          categories.map((category) =>
            category._id === id ? updatedCategory : category
          )
        );
        setEditingCategory(null);
      } else {
        console.error("Error updating category:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Handle deleting a category
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(categories.filter((category) => category._id !== id));
      } else {
        console.error("Error deleting category:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Expense Category
        </h2>

        {/* Add New Category Section */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1 text-gray-600 flex-grow mr-3"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>

        {/* List of Categories */}
        <ul className="space-y-3">
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex justify-between items-center border-b pb-2"
            >
              {editingCategory === category._id ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-gray-600 flex-grow mr-2"
                  value={category.categoryName}
                  onChange={(e) =>
                    setCategories(
                      categories.map((cat) =>
                        cat._id === category._id
                          ? { ...cat, categoryName: e.target.value }
                          : cat
                      )
                    )
                  }
                />
              ) : (
                <span className="text-gray-600 flex-grow">
                  {category.categoryName}
                </span>
              )}

              {editingCategory === category._id ? (
                <>
                  <button
                    className="text-green-500 font-semibold mr-3"
                    onClick={() =>
                      handleSave(category._id, category.categoryName)
                    }
                  >
                    Save
                  </button>
                  <button
                    className="text-red-500 font-semibold"
                    onClick={() => setEditingCategory(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    className="text-blue-500 font-semibold mr-3 cursor-pointer"
                    onClick={() => setEditingCategory(category._id)}
                  >
                    Edit
                  </span>
                  <span
                    className="text-red-500 font-semibold cursor-pointer"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseCategory;
