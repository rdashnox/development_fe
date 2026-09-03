import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "react-hot-toast";

import "@fontsource/atkinson-hyperlegible";

import "./index.css";
import App from "./App.jsx";
import theme from "./theme";

async function prepare() {
  if (import.meta.env.VITE_MOCK === "true") {
    const { startMockServer } = await import("./mock/index.js");
    await startMockServer();
  }
}

prepare().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryProvider>
            <App />
          </QueryProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
            }}
          />
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>,
  );
});
