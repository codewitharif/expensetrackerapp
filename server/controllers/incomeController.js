const Income = require("../models/incomeModel");

// Get all income records
const getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find().populate("category");
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving incomes", error });
  }
};

// Create a new income record
const createIncome = async (req, res) => {
  const { date, amount, category, mode, note, currency } = req.body;

  try {
    const newIncome = await Income.create({
      date,
      amount,
      category,
      mode,
      note,
      currency,
    });
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: "Error creating income", error });
  }
};

// Get a single income record by ID
const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id).populate("category");
    if (!income) return res.status(404).json({ message: "Income not found" });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving income", error });
  }
};

// Update an income record
const updateIncome = async (req, res) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate("category");
    if (!updatedIncome)
      return res.status(404).json({ message: "Income not found" });
    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(400).json({ message: "Error updating income", error });
  }
};

// Delete an income record
const deleteIncome = async (req, res) => {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    if (!deletedIncome)
      return res.status(404).json({ message: "Income not found" });
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting income", error });
  }
};

// const getDailyIncome = async (req, res) => {
//   try {
//     const { date } = req.query;
//     const today = new Date();
//     const targetDate = date ? new Date(date) : today;

//     // Set time range for the day (from 00:00:00 to 23:59:59)
//     const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
//     const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

//     const incomes = await Income.find({
//       date: { $gte: startOfDay, $lte: endOfDay },
//     });

//     res.status(200).json(incomes);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving daily incomes", error });
//   }
// };

const getDailyIncome = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const formattedDate = new Date(date).toISOString().split("T")[0];

    const incomes = await Income.find({
      date: formattedDate, // Compare with the stored string
    });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving daily incomes", error });
  }
};

// const getMonthlyIncome = async (req, res) => {
//   const { date } = req.query;
//   try {
//     const today = new Date();
//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//     const endOfMonth = new Date(
//       today.getFullYear(),
//       today.getMonth() + 1,
//       0,
//       23,
//       59,
//       59,
//       999
//     );

//     const incomes = await Income.find({
//       date: { $gte: startOfMonth, $lte: endOfMonth },
//     }).populate("category");

//     res.status(200).json(incomes);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving monthly incomes", error });
//   }
// };

// const getMonthlyIncome = async (req, res) => {
//   const { date } = req.query;
//   try {
//     if (!date) return res.status(400).json({ message: "Date is required" });

//     // Parse the provided date
//     const targetDate = new Date(date);

//     // Calculate the start and end of the month for the provided date
//     const startOfMonth = new Date(
//       targetDate.getFullYear(),
//       targetDate.getMonth(),
//       1
//     );
//     const endOfMonth = new Date(
//       targetDate.getFullYear(),
//       targetDate.getMonth() + 1,
//       0,
//       23,
//       59,
//       59,
//       999
//     );

//     // Fetch incomes for the calculated month
//     const incomes = await Income.find({
//       date: { $gte: startOfMonth, $lte: endOfMonth },
//     }).populate("category");

//     console.log("my monthly income api data is ");
//     console.log(incomes);

//     res.status(200).json(incomes);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving monthly incomes", error });
//   }
// };

const getMonthlyIncome = async (req, res) => {
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

    // Fetch incomes for the calculated month using string comparison
    const incomes = await Income.find({
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).populate("category");

    res.status(200).json(incomes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving monthly incomes", error });
  }
};

module.exports = {
  getAllIncome,
  createIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
  getDailyIncome,
  getMonthlyIncome,
};
