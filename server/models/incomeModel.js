const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
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
    ref: "IncomeCategory",
    required: true,
  },
  mode: {
    type: String,
    enum: ["Cash", "Card", "Bank Transfer", "Other"], // Example modes, you can adjust as needed
    required: true,
  },
  note: {
    type: String,
    default: "",
  },

  transactiontype: {
    type: String,
    default: "income",
  },
  currency: {
    type: String,
    default: "INR", // Default currency
  },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
