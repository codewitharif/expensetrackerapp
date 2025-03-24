const IncomeCategory = require("../models/incomeCategoryModel");

// Get all income categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await IncomeCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories", error });
  }
};

// Create a new income category
const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const category = await IncomeCategory.create({ categoryName });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Error creating category", error });
  }
};

// Get a single income category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await IncomeCategory.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving category", error });
  }
};

// Update an income category
const updateCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const updatedCategory = await IncomeCategory.findByIdAndUpdate(
      req.params.id,
      { categoryName },
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Error updating category", error });
  }
};

// Delete an income category
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await IncomeCategory.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
