import api from "./index";

export const getBookings = (status) =>
  api.get(`/booking${status ? `?status=${status}` : ""}`);

export const cancellBooking = (bookingId) =>
  api.put("/booking/cancel", { bookingId });
