import api from "./index";

export const fetchAllProperties = () => api.get("/properties");

export const getOneProperty = ({
  checkIn,
  checkOut,
  noOfRooms,
  noOfAdults,
  propertyId,
}) =>
  api.get(
    `/properties/search/${propertyId}?${checkIn ? `&checkIn=${checkIn}` : ""}${
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

export const findProperty = (propertyId, select, populate) => {
  console.log(
    `/properties/find/${propertyId}?select=${select}&populate=${populate}`
  );
  return api.get(
    `/properties/find/${propertyId}?select=${select}&populate=${populate}`
  );
};
