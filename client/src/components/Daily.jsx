import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CurrencyContext from "./context/CurrencyContext";
import ColorSettingContext from "./context/ColorSettingContext";

const Daily = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0); // Total income for the current month
  const [monthlyExpenses, setMonthlyExpenses] = useState(0); // Total expenses for the current month
  const { currency, convertCurrency } = useContext(CurrencyContext);
  const { colors } = useContext(ColorSettingContext);

  console.log("my colors are ", colors);

  useEffect(() => {
    fetchMonthlyData(); // Fetch monthly totals
    fetchDailyData(date); // Fetch daily transactions
  }, [date]);

  // Fetch monthly totals (income and expenses)
  const fetchMonthlyData = async () => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript

      // Fetch monthly income
      const incomeResponse = await axios.get(
        `http://localhost:5000/api/incomes/monthly?date=${year}-${month}-01`
      );
      const totalMonthlyIncome = incomeResponse.data.reduce(
        (sum, income) => sum + income.amount,
        0
      );
      setMonthlyIncome(totalMonthlyIncome);

      // Fetch monthly expenses
      const expenseResponse = await axios.get(
        `http://localhost:5000/api/expenses/monthly?date=${year}-${month}-01`
      );
      const totalMonthlyExpenses = expenseResponse.data.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      setMonthlyExpenses(totalMonthlyExpenses);
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  };

  // Fetch daily transactions (income and expenses)
  const fetchDailyData = async (selectedDate) => {
    try {
      const incomeResponse = await axios.get(
        `http://localhost:5000/api/incomes/daily?date=${selectedDate}`
      );
      setIncomes(incomeResponse.data);

      const expenseResponse = await axios.get(
        `http://localhost:5000/api/expenses/daily?date=${selectedDate}`
      );
      setExpenses(expenseResponse.data);
    } catch (error) {
      console.error("Error fetching daily data:", error);
    }
  };

  // Combine and sort transactions
  const combinedTransactions = [...incomes, ...expenses].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <>
      {/* Summary Section */}
      <div className="flex flex-col sm:flex-row justify-around bg-gray-100 p-4 text-center text-gray-800">
        {/* Date Input */}
        <div className="mb-4 sm:mb-0 ">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Monthly Income */}
        <div className="mb-4 sm:mb-0 sm:w-1/4">
          <h3 className="text-sm font-medium">Income (Monthly)</h3>
          <p className={`text-${colors.incomeColor}-600 font-bold text-lg`}>
            {currency} {convertCurrency(monthlyIncome)}
          </p>
        </div>

        {/* Monthly Expenses */}
        <div className="mb-4 sm:mb-0 sm:w-1/4">
          <h3 className="text-sm font-medium">Expenses (Monthly)</h3>
          <p className={`text-${colors.expenseColor}-600 font-bold text-lg`}>
            {currency} {convertCurrency(monthlyExpenses)}
          </p>
        </div>

        {/* Monthly Total */}
        <div className="mb-4 sm:mb-0 sm:w-1/4">
          <h3 className="text-sm font-medium">Total (Monthly)</h3>
          <p className="text-gray-800 font-bold text-lg">
            {currency} {convertCurrency(monthlyIncome - monthlyExpenses)}
          </p>
        </div>
      </div>

      {/* Daily Transactions List */}
      <h2 className="text-lg font-semibold mt-4 mb-2">Transactions (Daily)</h2>
      {combinedTransactions.map((transaction, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 border-b border-gray-300"
        >
          <div>
            <p className="text-sm font-medium">{transaction.date}</p>
          </div>
          <div className="flex-1 ml-4">
            <p className="text-sm font-medium truncate">{transaction.note}</p>
          </div>
          <div className="text-right">
            <p
              className={`text-sm font-bold ${
                transaction.transactiontype === "expense"
                  ? `text-${colors.expenseColor}-600`
                  : `text-${colors.incomeColor}-600`
              }`}
            >
              {/* Display original amount and currency */}
              <span>
                {transaction.amount} {transaction.currency}
              </span>
              <br />
              {/* Display converted amount and selected currency */}
              <span>
                ({currency} {convertCurrency(transaction.amount)})
              </span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Daily;
