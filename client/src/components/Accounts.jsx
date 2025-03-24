import React, { useState, useEffect } from "react";
import axios from "axios";

const Accounts = () => {
  const [currency, setCurrency] = useState([]);
  const [accounts, setAccounts] = useState([
    { id: 1, accountname: "BOI", currency: "INR", amount: 200, type: "Saving" },
    {
      id: 2,
      accountname: "KOTAK",
      currency: "INR",
      amount: 300,
      type: "Investment",
    },
    { id: 3, accountname: "SBI", currency: "INR", amount: 800, type: "Saving" },
  ]);

  const [newAccount, setNewAccount] = useState({
    accountname: "",
    currency: "INR",
    amount: "",
    type: "Saving",
  });

  const [editingAccountId, setEditingAccountId] = useState(null);

  const fetchCurrency = async () => {
    try {
      const response = await axios.get(
        "https://api.frankfurter.dev/v1/currencies"
      );
      setCurrency(response.data);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAccount = () => {
    if (!newAccount.accountname || !newAccount.amount)
      return alert("Please fill all fields!");
    setAccounts((prev) => [
      ...prev,
      { ...newAccount, id: Date.now(), amount: parseFloat(newAccount.amount) },
    ]);
    setNewAccount({
      accountname: "",
      currency: "INR",
      amount: "",
      type: "Saving",
    });
  };

  const handleEdit = (id) => {
    const accountToEdit = accounts.find((acc) => acc.id === id);
    setNewAccount(accountToEdit);
    setEditingAccountId(id);
  };

  const handleSave = (id) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id
          ? { ...account, ...newAccount, amount: parseFloat(newAccount.amount) }
          : account
      )
    );
    setEditingAccountId(null);
    setNewAccount({
      accountname: "",
      currency: "INR",
      amount: "",
      type: "Saving",
    });
  };

  const handleDelete = (id) => {
    setAccounts((prev) => prev.filter((account) => account.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[90%] max-w-lg rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Accounts</h2>

        {/* Add/Edit Account Section */}
        <div className="grid gap-4 mb-6 grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Account Name
            </label>
            <input
              type="text"
              name="accountname"
              value={newAccount.accountname}
              onChange={handleInputChange}
              className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter Account Name"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Account Type
            </label>
            <select
              name="type"
              value={newAccount.type}
              onChange={handleInputChange}
              className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
            >
              <option value="Saving">Saving Account</option>
              <option value="Investment">Investment Account</option>
              <option value="Virtual">Virtual Account</option>
              <option value="Debit">Debit Card</option>
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Currency
            </label>
            <select
              name="currency"
              value={newAccount.currency}
              onChange={handleInputChange}
              className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
            >
              {Object.entries(currency).map(([code, name]) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={newAccount.amount}
              onChange={handleInputChange}
              className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter Amount"
            />
          </div>
          <button
            onClick={
              editingAccountId
                ? () => handleSave(editingAccountId)
                : handleAddAccount
            }
            className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingAccountId ? "Save Changes" : "Add Account"}
          </button>
        </div>

        {/* Accounts List */}
        <ul className="space-y-3">
          {accounts.map((account) => (
            <li key={account.id} className="flex justify-between items-center">
              <div className="flex-grow">
                <p className="text-gray-600">
                  <strong>{account.accountname}</strong> ({account.type}) -{" "}
                  {account.currency} {account.amount}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 font-semibold"
                  onClick={() => handleEdit(account.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => handleDelete(account.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accounts;
