import api from "./index";

export const fetchAllFacilities = () => api.get("/facilities");
