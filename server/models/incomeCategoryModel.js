const mongoose = require("mongoose");

const incomeCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true, // Makes the field mandatory
    unique: true, // Ensures no duplicate category names
    trim: true, // Removes leading/trailing spaces
  },
});

const IncomeCategory = mongoose.model("IncomeCategory", incomeCategorySchema);

module.exports = IncomeCategory;
