import api from "./index";

export const fetchAllProperties = () => api.get("/properties");

export const searchProperties = ({
  queryText,
  checkIn,
  checkOut,
  noOfRooms,
  noOfAdults,
}) =>
  api.get(
    `/properties/search?queryText=${queryText}${
      checkIn ? `&checkIn=${checkIn}` : ""
    }${checkOut ? `&checkOut=${checkOut}` : ""}${
      noOfRooms ? `&noOfRooms=${noOfRooms}` : ""
    }${noOfAdults ? `&noOfAdults=${noOfAdults}` : ""}`
  );

export const getValidSearchOptions = (queryText) =>
  api.get(`/properties/options?queryText=${queryText}`);
