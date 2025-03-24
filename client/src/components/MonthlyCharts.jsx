import React, { useState, useEffect, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import CurrencyContext from "./context/CurrencyContext";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlyCharts = () => {
  const [type, setType] = useState("expenses"); // Toggle between income and expenses
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [totalAmount, setTotalAmount] = useState(0);
  const [details, setDetails] = useState([]);
  const { currency, convertCurrency } = useContext(CurrencyContext);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = new Date().toISOString().split("T")[0]; // Use current date or allow user input
        const incomeResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/incomes/monthly?date=${date}`
        );
        const expenseResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/expenses/monthly?date=${date}`
        );
        const incomeCategoriesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/incomeCategories`
        );
        const expenseCategoriesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/expenseCategories`
        );

        console.log("Income Data:", incomeResponse.data);
        console.log("Expense Data:", expenseResponse.data);
        console.log("Income Categories:", incomeCategoriesResponse.data);
        console.log("Expense Categories:", expenseCategoriesResponse.data);

        // Process data based on selected type (income or expenses)
        const categories =
          type === "income"
            ? incomeCategoriesResponse.data
            : expenseCategoriesResponse.data;
        const transactions =
          type === "income" ? incomeResponse.data : expenseResponse.data;

        console.log("Categories:", categories);
        console.log("Transactions:", transactions);

        // Aggregate data by category
        const categoryMap = new Map();
        categories.forEach((category) => {
          categoryMap.set(category._id, {
            name: category.categoryName,
            total: 0,
          }); // Use categoryName
        });

        transactions.forEach((transaction) => {
          const categoryId = transaction.category._id; // Access the _id from the category object
          if (categoryMap.has(categoryId)) {
            categoryMap.get(categoryId).total += transaction.amount;
          }
        });

        console.log("Category Map:", categoryMap);

        // Prepare data for the chart
        const labels = [];
        const amounts = [];
        const backgroundColors = [];
        const borderColors = [];

        categoryMap.forEach((value, key) => {
          if (value.total > 0) {
            labels.push(value.name);
            amounts.push(value.total);
            backgroundColors.push(getRandomColor());
            borderColors.push("#ffffff");
          }
        });

        console.log("Labels:", labels);
        console.log("Amounts:", amounts);

        const total = amounts.reduce((acc, val) => acc + val, 0);
        const details = labels.map((label, index) => {
          const amount = amounts[index];
          const percentage = ((amount / total) * 100).toFixed(2);
          return { label, amount, percentage };
        });

        console.log("Total Amount:", total);
        console.log("Details:", details);

        setData({
          labels,
          datasets: [
            {
              label: `Monthly ${type === "income" ? "Income" : "Expenses"}`,
              data: amounts,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        });
        setTotalAmount(total);
        setDetails(details);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type]);

  // Generate random colors for the chart
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${currency} ${convertCurrency(
              tooltipItem.raw
            )}`,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Monthly Charts</h1>
      <div className="w-full max-w-xs mx-auto">
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
        </select>
      </div>
      <div style={{ position: "relative", height: "300px", width: "100%" }}>
        {data.labels.length > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p>No data available for the selected month.</p>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        {details.map((detail, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: data.datasets[0].backgroundColor[index],
                  marginRight: "10px",
                }}
              ></div>
              <span>{detail.label}</span>
            </div>
            <div>{detail.percentage}%</div>
            <div>
              {currency} {convertCurrency(detail.amount)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <strong>Total {type === "income" ? "Income" : "Expenses"}:</strong>{" "}
        {currency} {convertCurrency(totalAmount)}
      </div>
    </div>
  );
};

export default MonthlyCharts;
