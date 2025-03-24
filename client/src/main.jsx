import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CurrencyProvider } from "./components/context/CurrencyContext.jsx";
import { ColorSettingProvider } from "./components/context/ColorSettingContext.jsx";
import { SubcategoryProvider } from "./components/context/SubcategoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CurrencyProvider>
      <ColorSettingProvider>
        <SubcategoryProvider>
          <App />
        </SubcategoryProvider>
      </ColorSettingProvider>
    </CurrencyProvider>
  </StrictMode>
);
