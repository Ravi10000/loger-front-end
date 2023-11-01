import api from "./index";

export const addToWishlist = (propertyId) =>
  api.post("/wishlist", { propertyId });

export const removeFromWishlist = (propertyId) =>
  api.delete(`/wishlist/${propertyId}`);

export const fetchWishlist = () => api.get("/wishlist");
