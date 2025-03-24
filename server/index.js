require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const database = require("./db/conn");

const incomeRoutes = require("./routes/incomeRoutes");
const incomeCategoryRoutes = require("./routes/incomeCategoryRoutes");
const expenseCategoryRoutes = require("./routes/expenseCategoryRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const accountRoutes = require("./routes/accountRoutes");

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/incomes", incomeRoutes);
app.use("/api/expenses", expenseRoutes);

app.use("/api/incomeCategories", incomeCategoryRoutes);
app.use("/api/expenseCategories", expenseCategoryRoutes);

app.use("/api/accounts", accountRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
