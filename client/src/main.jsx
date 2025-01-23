import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ChakraProvider } from "./components/ui/provider";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
