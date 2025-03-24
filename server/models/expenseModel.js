const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpenseCategory",
    required: true,
  },
  subcategory: {
    // Add this field
    type: String,
    default: "", // Default to empty string if not provided
  },
  mode: {
    type: String,
    enum: ["Cash", "Card", "Bank Transfer", "UPI", "Other"], // Example modes, you can adjust as needed
    required: true,
  },
  note: {
    type: String,
    default: "",
  },

  transactiontype: {
    type: String,
    default: "expense",
  },
  currency: {
    type: String,
    default: "INR", // Default currency
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
