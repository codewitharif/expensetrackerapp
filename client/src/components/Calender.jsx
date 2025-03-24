import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

// Set up the localizer with moment.js
const localizer = momentLocalizer(moment);

const Calender = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch income and expense data from the API
  const fetchData = async () => {
    try {
      const incomeResponse = await axios.get(
        "http://localhost:5000/api/incomes"
      );
      const expenseResponse = await axios.get(
        "http://localhost:5000/api/expenses"
      );

      // Map income data to events
      const incomeEvents = incomeResponse.data.map((income) => ({
        title: `Income: ${income.note}`,
        start: new Date(income.date),
        end: new Date(income.date),
        allDay: true,
        type: "income",
        amount: income.amount,
        category: income.category,
        mode: income.mode,
      }));

      // Map expense data to events
      const expenseEvents = expenseResponse.data.map((expense) => ({
        title: `Expense: ${expense.note}`,
        start: new Date(expense.date),
        end: new Date(expense.date),
        allDay: true,
        type: "expense",
        amount: expense.amount,
        category: expense.category,
        mode: expense.mode,
      }));

      // Combine income and expense events
      setEvents([...incomeEvents, ...expenseEvents]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount
  React.useEffect(() => {
    fetchData();
  }, []);

  // Handle event selection
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Custom event style
  const eventStyleGetter = (event) => {
    const backgroundColor = event.type === "income" ? "#2ECC71" : "#E74C3C";
    const style = {
      backgroundColor,
      borderRadius: "5px",
      color: "white",
      border: "none",
    };
    return { style };
  };

  return (
    <div className="mx-10 my-10">
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
            <p>
              <strong>Amount:</strong> ${selectedEvent.amount}
            </p>
            <p>
              <strong>Category:</strong> {selectedEvent.category}
            </p>
            <p>
              <strong>Mode:</strong> {selectedEvent.mode}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;
