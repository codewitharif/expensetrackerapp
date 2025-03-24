const ExpenseCategory = require("../models/expenseCategoryModel");

// Get all expense categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await ExpenseCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories", error });
  }
};

// Create a new expense category
const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const category = await ExpenseCategory.create({
      categoryName,
      subcategories: req.body.subcategories || [], // Add subcategories if provided
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Error creating category", error });
  }
};

// Get a single expense category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await ExpenseCategory.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving category", error });
  }
};

// Update an expense category
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await ExpenseCategory.findByIdAndUpdate(
      req.params.id,
      req.body, // Now handles both categoryName and subcategories
      { new: true, runValidators: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Error updating category", error });
  }
};

// Delete an expense category
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await ExpenseCategory.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

// Add subcategories to existing category
const addSubcategories = async (req, res) => {
  try {
    if (!req.body.subcategories || !Array.isArray(req.body.subcategories)) {
      return res.status(400).json({ message: "Invalid subcategories format" });
    }

    const category = await ExpenseCategory.findByIdAndUpdate(
      req.params.id,
      { $push: { subcategories: { $each: req.body.subcategories } } },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a specific subcategory
const updateSubcategory = async (req, res) => {
  try {
    const { subcategoryIndex } = req.params;
    const { newSubcategory } = req.body;

    const category = await ExpenseCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (subcategoryIndex >= category.subcategories.length) {
      return res.status(400).json({ message: "Invalid subcategory index" });
    }

    category.subcategories[subcategoryIndex] = newSubcategory;
    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific subcategory
const deleteSubcategory = async (req, res) => {
  try {
    const { subcategory } = req.params;

    const category = await ExpenseCategory.findByIdAndUpdate(
      req.params.id,
      { $pull: { subcategories: subcategory } },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addSubcategories,
  updateSubcategory,
  deleteSubcategory,
};
