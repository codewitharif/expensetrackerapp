import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Charts from "./components/Charts";
import Calender from "./components/Calender";
import Settings from "./components/Settings";
import Configuration from "./components/Configuration";
import IncomeCategory from "./components/IncomeCategory";
import ExpenseCategory from "./components/ExpenseCategory";
import Accounts from "./components/Accounts";
import Help from "./components/Help";
import Feedback from "./components/Feedback";
import ManageExpenseSubCategories from "./components/ManageExpenseSubCategories";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/configuration" element={<Configuration />} />
          <Route
            path="/settings/configuration/income-category"
            element={<IncomeCategory />}
          />
          <Route
            path="/settings/configuration/expense-category"
            element={<ExpenseCategory />}
          />
          <Route
            path="/settings/configuration/expense-subcategory"
            element={<ManageExpenseSubCategories />}
          />

          <Route path="/settings/accounts" element={<Accounts />} />
          <Route path="/settings/help" element={<Help />} />
          <Route path="/settings/feedback" element={<Feedback />} />
        </Routes>
        <br />
        <br />
        <br />
        <br />
        <Navbar />
      </Router>
    </div>
  );
};

export default App;
