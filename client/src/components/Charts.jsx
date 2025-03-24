import React, { useState } from "react";
import MonthlyCharts from "./MonthlyCharts";
import YearlyCharts from "./YearlyCharts";

const Charts = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  return (
    <div>
      <div>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <ul
              className="flex flex-nowrap -mb-px text-sm font-medium text-center"
              role="tablist"
            >
              {/* Monthly chart Tab */}
              <li className="me-2 flex-shrink-0" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "monthly"
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("monthly")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "monthly"}
                >
                  Monthly
                </button>
              </li>

              {/* Yearly chart Tab */}
              <li className="me-2 flex-shrink-0" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "yearly"
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("yearly")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "yearly"}
                >
                  Yearly
                </button>
              </li>

              {/* Total Tab */}
              {/* <li className="me-2 flex-shrink-0" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "total"
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("total")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "total"}
                >
                  Total
                </button>
              </li> */}

              {/* Calendar Tab */}
              {/* <li className="flex-shrink-0" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "calendar"
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("calendar")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "calendar"}
                >
                  Calendar
                </button>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Render Component Based on Active Tab */}
        <div>
          {activeTab === "monthly" && <MonthlyCharts />}
          {activeTab === "yearly" && <YearlyCharts />}
          {/* {activeTab === "total" && <Total />} */}
          {/* {activeTab === "calendar" && <Calender />} */}
        </div>
        {/* <div>
          {activeTab === "daily" && (
            <div
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              role="tabpanel"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content for the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  Daily tab's associated content
                </strong>
                .
              </p>
            </div>
          )}

          {activeTab === "monthly" && (
            <div
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              role="tabpanel"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content for the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  Monthly tab's associated content
                </strong>
                .
              </p>
            </div>
          )}

          {activeTab === "total" && (
            <div
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              role="tabpanel"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content for the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  Total tab's associated content
                </strong>
                .
              </p>
            </div>
          )}

          {activeTab === "calendar" && (
            <div
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              role="tabpanel"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content for the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  Calendar tab's associated content
                </strong>
                .
              </p>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Charts;
