import api from "./index";

export const fetchAllProperties = () => api.get("/properties");

export const searchProperties = ({
  queryText,
  checkIn,
  checkOut,
  noOfRooms,
  noOfAdults,
  propertyId,
}) =>
  api.get(
    `/properties/search${
      propertyId ? "/" + propertyId : ""
    }?queryText=${queryText}${checkIn ? `&checkIn=${checkIn}` : ""}${
      checkOut ? `&checkOut=${checkOut}` : ""
    }${noOfRooms ? `&noOfRooms=${noOfRooms}` : ""}${
      noOfAdults ? `&noOfAdults=${noOfAdults}` : ""
    }`
  );

export const filterProperties = (filterOptions) =>
  api.post(`/properties/filter`, filterOptions);

export const getValidSearchOptions = (queryText) =>
  api.get(`/properties/options?queryText=${queryText}`);

export const fetchProperty = (id) => api.get(`/properties/${id}`);
