import api from "./index";

export const fetchAllProperties = () => api.get("/properties");
