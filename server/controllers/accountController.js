const Account = require("../models/accountModel");

// Create a new account
const createAccount = async (req, res) => {
  const { accountName, accountType, currency, initialBalance } = req.body;

  try {
    // Validate request data
    if (!accountName || !accountType || !currency || initialBalance == null) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create account object
    const account = new Account({
      accountName,
      accountType,
      currency,
      initialBalance,
      currentBalance: initialBalance, // Initialize currentBalance with initialBalance
    });

    // Save to database
    await account.save();

    res.status(201).json({ message: "Account created successfully.", account });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Failed to create account.", error });
  }
};

// Get all accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts.", error });
  }
};

// Get a single account by ID
const getAccountById = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }
    res.status(200).json(account);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ message: "Failed to fetch account.", error });
  }
};

// Update an account
const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { accountName, accountType, currency, initialBalance } = req.body;

  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Update fields
    account.accountName = accountName || account.accountName;
    account.accountType = accountType || account.accountType;
    account.currency = currency || account.currency;
    account.initialBalance = initialBalance || account.initialBalance;

    // Save changes
    const updatedAccount = await account.save();

    res
      .status(200)
      .json({ message: "Account updated successfully.", updatedAccount });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ message: "Failed to update account.", error });
  }
};

// Delete an account
const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }
    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account.", error });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
};
