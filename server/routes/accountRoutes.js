const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");

// Route to create a new account
router.post("/", createAccount);

// Route to get all accounts
router.get("/", getAccounts);

// Route to get a single account by ID
router.get("/:id", getAccountById);

// Route to update an account
router.put("/:id", updateAccount);

// Route to delete an account
router.delete("/:id", deleteAccount);

module.exports = router;
