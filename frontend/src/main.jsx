import { StrictMode } from "react";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider>
      
        <App />
      
    </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
