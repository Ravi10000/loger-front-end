import api from "./index";

export const fetchAllFacilities = () => api.get("/facilities");
export const fetchMultipleFacilities = (facilitiesList) =>
  api.post("/facilities/multiple", { facilitiesList });
