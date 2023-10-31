import api, { getAuthToken } from "./index";

export const initiateTransaction = (data) =>
  api.post("/transaction", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

export const fetchTransactionAndBooking = (id) => api.get(`/transaction/${id}`);
