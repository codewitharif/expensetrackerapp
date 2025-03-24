const express = require("express");
const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/incomeCategoryController");

const router = express.Router();

// Route to get all categories
router.get("/", getAllCategories);

// Route to create a new category
router.post("/", createCategory);

// Route to get a category by ID
router.get("/:id", getCategoryById);

// Route to update a category by ID
router.put("/:id", updateCategory);

// Route to delete a category by ID
router.delete("/:id", deleteCategory);

module.exports = router;
