import { StrictMode } from "react";
import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

import App from "@/App.tsx";
import i18n from "@/i18n/config.tsx";
import ContextWrapper from "@/context";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ContextWrapper>
          <App />
        </ContextWrapper>
        <ToastContainer autoClose={2000} />
      </I18nextProvider>
    </QueryClientProvider>
  </StrictMode>
);
