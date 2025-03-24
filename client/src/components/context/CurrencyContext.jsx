import React, { createContext, useState, useEffect } from "react";
import {
  fetchSupportedCurrencies,
  fetchExchangeRates,
} from "../utils/currency";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
  );
  const [exchangeRates, setExchangeRates] = useState({});
  const [supportedCurrencies, setSupportedCurrencies] = useState([]); // Initialize as an empty array

  // Fetch supported currencies on component mount
  useEffect(() => {
    const loadCurrencies = async () => {
      const currencies = await fetchSupportedCurrencies();
      setSupportedCurrencies(currencies);
    };
    loadCurrencies();
  }, []);

  // Fetch exchange rates when currency changes
  useEffect(() => {
    const loadExchangeRates = async () => {
      const rates = await fetchExchangeRates("INR"); // Fetch rates with INR as base
      setExchangeRates(rates);
    };
    loadExchangeRates();
  }, []);

  // Convert amount to selected currency
  const convertCurrency = (amount) => {
    if (!exchangeRates[currency]) return amount; // Fallback to original amount
    return (amount * exchangeRates[currency]).toFixed(2);
  };

  // Save currency to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, supportedCurrencies, convertCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
