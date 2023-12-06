import "./fonts.css";
import "./index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import App from "./App.jsx";

import AuthWindowProvider from "#contexts/auth-window.context.jsx";
import ReviewWindowProvider from "#contexts/review-window.context.jsx";
import store from "#redux/store";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     retry: 1,
  //     refetchOnWindowFocus: false,
  //   },
  // },
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthWindowProvider>
              <ReviewWindowProvider>
                <App />
              </ReviewWindowProvider>
            </AuthWindowProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
