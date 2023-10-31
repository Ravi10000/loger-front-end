import api from "./index";

export const fetchGuestUsers = () => api.get("/user/guests");
