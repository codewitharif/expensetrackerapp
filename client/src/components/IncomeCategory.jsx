import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/incomeCategories";

const IncomeCategory = () => {
  // State for categories
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;
    try {
      const response = await axios.post(API_URL, { categoryName: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  // Handle editing a category
  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  // Handle saving an updated category
  const handleSave = async () => {
    if (!editingCategory) return;
    try {
      const response = await axios.put(`${API_URL}/${editingCategory._id}`, {
        categoryName: editingCategory.categoryName,
      });
      setCategories(
        categories.map((cat) =>
          cat._id === editingCategory._id ? response.data : cat
        )
      );
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  // Handle deleting a category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Income Categories
        </h2>

        {/* Add New Category */}
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

        {/* Categories List */}
        <ul className="space-y-3">
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex justify-between items-center border-b pb-2"
            >
              {editingCategory && editingCategory._id === category._id ? (
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-gray-600 flex-grow mr-2"
                  value={editingCategory.categoryName}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      categoryName: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="text-gray-600 flex-grow">
                  {category.categoryName}
                </span>
              )}

              {editingCategory && editingCategory._id === category._id ? (
                <>
                  <button
                    className="text-green-500 font-semibold mr-3"
                    onClick={handleSave}
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
                    onClick={() => handleEdit(category)}
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

export default IncomeCategory;
