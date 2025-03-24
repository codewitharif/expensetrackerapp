const mongoose = require("mongoose");

const expenseCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subcategories: {
    type: [String],
    default: [], // Initialize with empty array
  },
});

const ExpenseCategory = mongoose.model(
  "ExpenseCategory",
  expenseCategorySchema
);

module.exports = ExpenseCategory;
