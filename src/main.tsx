import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/routes";
import "./styles/index.css";
import { AppProvider } from "./context/AppProvider";
import { Provider } from "./components/ui/provider";
import './i18n';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
