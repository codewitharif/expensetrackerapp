const express = require("express");
const {
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getDailyExpense,
  getMonthlyExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/daily", getDailyExpense);

// Route to get all incomes for the current month
router.get("/monthly", getMonthlyExpense);

// Route to get all expenses
router.get("/", getAllExpenses);

// Route to create a new expense
router.post("/", createExpense);

// Route to get an expense by ID
router.get("/:id", getExpenseById);

// Route to update an expense by ID
router.put("/:id", updateExpense);

// Route to delete an expense by ID
router.delete("/:id", deleteExpense);

module.exports = router;
