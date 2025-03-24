const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
  accountType: { type: String, required: true }, // e.g., Savings, Business
  currency: { type: String, required: true }, // e.g., INR, USD
  initialBalance: { type: Number, required: true },
  currentBalance: { type: Number, required: true }, // Tracks the latest balance
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
