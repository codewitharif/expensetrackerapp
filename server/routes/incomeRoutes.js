const express = require("express");
const {
  getAllIncome,
  createIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
  getDailyIncome,
  getMonthlyIncome,
} = require("../controllers/incomeController");

const router = express.Router();

router.get("/daily", getDailyIncome);

// Route to get all incomes for the current month
router.get("/monthly", getMonthlyIncome);

// Route to get all incomes
router.get("/", getAllIncome);

// Route to create a new income
router.post("/", createIncome);

// Route to get a single income by ID
router.get("/:id", getIncomeById);

// Route to update an income by ID
router.put("/:id", updateIncome);

// Route to delete an income by ID
router.delete("/:id", deleteIncome);

module.exports = router;
