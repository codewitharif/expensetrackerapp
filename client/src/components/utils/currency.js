// utils/currency.js
import axios from "axios";

const API_KEY = "c619eddfef49b4b4e6e328be";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

// Fetch supported currencies
export const fetchSupportedCurrencies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/codes`);
    return response.data.supported_codes.map(([code, name]) => ({
      value: code,
      label: `${code} (${name})`,
    }));
  } catch (error) {
    console.error("Error fetching supported currencies:", error);
    return [];
  }
};

// Fetch exchange rates
export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}/latest/${baseCurrency}`);
    return response.data.conversion_rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};
