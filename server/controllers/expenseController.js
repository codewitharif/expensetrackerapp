const Expense = require("../models/expenseModel");

// Get all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("category"); // Populates the category details
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expenses", error });
  }
};

// Create a new expense
const createExpense = async (req, res) => {
  const { date, amount, category, subcategory, mode, note, currency } =
    req.body;

  console.log(req.body);

  try {
    const expense = await Expense.create({
      date,
      amount,
      category,
      subcategory,
      mode,
      note,
      currency,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: "Error creating expense", error });
  }
};

// Get a single expense by ID
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate("category");
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expense", error });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  const { date, amount, category, subcategory, mode, note } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { date, amount, category, subcategory, mode, note },
      { new: true }
    ).populate("category");

    if (!updatedExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: "Error updating expense", error });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense)
      return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
};

const getDailyExpense = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const formattedDate = new Date(date).toISOString().split("T")[0];

    const incomes = await Expense.find({
      date: formattedDate, // Compare with the stored string
    });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving daily incomes", error });
  }
};

const getMonthlyExpense = async (req, res) => {
  const { date } = req.query;
  try {
    if (!date) return res.status(400).json({ message: "Date is required" });

    // Parse the provided date
    const targetDate = new Date(date);

    // Calculate the start and end of the month for the provided date
    const startOfMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      1
    )
      .toISOString()
      .split("T")[0]; // Format as YYYY-MM-DD
    const endOfMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      0
    )
      .toISOString()
      .split("T")[0]; // Format as YYYY-MM-DD

    const expenses = await Expense.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).populate("category");

    res.status(200).json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving monthly expenses", error });
  }
};
module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getDailyExpense,
  getMonthlyExpense,
};
