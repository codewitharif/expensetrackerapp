import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageExpenseSubCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [editSubcategory, setEditSubcategory] = useState({
    index: -1,
    value: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/expenseCategories"
      );
      setCategories(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubcategory = async () => {
    if (!selectedCategory || !newSubcategory.trim()) {
      setError("Please select a category and enter a subcategory name");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/api/expenseCategories/${selectedCategory}/subcategories`,
        { subcategories: [newSubcategory.trim()] }
      );
      setNewSubcategory("");
      setSuccess("Subcategory added successfully");
      setError("");
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add subcategory");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubcategory = async () => {
    if (
      !selectedCategory ||
      editSubcategory.index === -1 ||
      !editSubcategory.value.trim()
    ) {
      setError("Invalid edit operation");
      return;
    }

    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:5000/api/expenseCategories/${selectedCategory}/subcategories/${editSubcategory.index}`,
        { newSubcategory: editSubcategory.value.trim() }
      );
      setEditSubcategory({ index: -1, value: "" });
      setSuccess("Subcategory updated successfully");
      setError("");
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update subcategory");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubcategory = async (subcategory) => {
    if (!selectedCategory || !subcategory) {
      setError("Please select a category and subcategory");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:5000/api/expenseCategories/${selectedCategory}/subcategories/${encodeURIComponent(
          subcategory
        )}`
      );
      setSuccess("Subcategory deleted successfully");
      setError("");
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete subcategory");
    } finally {
      setLoading(false);
    }
  };

  const currentCategory = categories.find((c) => c._id === selectedCategory);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Expense Subcategories
      </h2>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Add Subcategory */}
      {selectedCategory && (
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              placeholder="New subcategory name"
              className="flex-1 p-2 border rounded-md"
            />
            <button
              onClick={handleAddSubcategory}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              Add Subcategory
            </button>
          </div>

          {/* Subcategories List */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">
              Existing Subcategories:
            </h3>
            {currentCategory?.subcategories?.map((sub, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                {editSubcategory.index === index ? (
                  <input
                    type="text"
                    value={editSubcategory.value}
                    onChange={(e) =>
                      setEditSubcategory({
                        ...editSubcategory,
                        value: e.target.value,
                      })
                    }
                    className="flex-1 mr-2 p-1 border rounded"
                  />
                ) : (
                  <span className="text-gray-700">{sub}</span>
                )}

                <div className="flex gap-2">
                  {editSubcategory.index === index ? (
                    <button
                      onClick={handleUpdateSubcategory}
                      className="text-green-500 hover:text-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditSubcategory({ index, value: sub })}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteSubcategory(sub)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Messages */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
    </div>
  );
};

export default ManageExpenseSubCategories;
