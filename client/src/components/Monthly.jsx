import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CurrencyContext from "./context/CurrencyContext";

const Monthly = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { currency, convertCurrency } = useContext(CurrencyContext);

  useEffect(() => {
    fetchMonthlyData(date);
  }, [date]);

  const fetchMonthlyData = async (selectedDate) => {
    try {
      const incomeResponse = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/incomes/monthly?date=${selectedDate}`
      );
      setIncomes(incomeResponse.data);

      const expenseResponse = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/expenses/monthly?date=${selectedDate}`
      );
      setExpenses(expenseResponse.data);
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  };

  // Combine and sort transactions
  const combinedTransactions = [...incomes, ...expenses].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Calculate totals in the selected currency
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-around bg-gray-100 p-4 text-center text-gray-800">
        {/* Date Input */}
        <div className="mb-4 sm:mb-0">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Income */}
        <div className="mb-4 sm:mb-0 sm:w-1/4">
          <h3 className="text-sm font-medium">Income</h3>
          <p className="text-blue-600 font-bold text-lg">
            {currency} {convertCurrency(totalIncome)}
          </p>
        </div>

        {/* Expenses */}
        <div className="mb-4 sm:mb-0 sm:w-1/4">
          <h3 className="text-sm font-medium">Expenses</h3>
          <p className="text-red-600 font-bold text-lg">
            {currency} {convertCurrency(totalExpenses)}
          </p>
        </div>

        {/* Total */}
        <div className="mb-4 sm:mb-0 sm:w-1/4">
          <h3 className="text-sm font-medium">Total</h3>
          <p className="text-gray-800 font-bold text-lg">
            {currency} {convertCurrency(totalIncome - totalExpenses)}
          </p>
        </div>
      </div>

      {/* Combined Transactions List */}
      <h2 className="text-lg font-semibold mt-4 mb-2">Transactions</h2>
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
                  ? "text-red-600"
                  : "text-green-600"
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

export default Monthly;
