import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
console.log(import.meta.env.VITE_API_URL);

export const getAuthToken = () => localStorage.getItem("AvJO)%zOxm}S/iy");
export const setAuthToken = (token) =>
  localStorage.setItem("AvJO)%zOxm}S/iy", token);
export const removeAuthToken = () => localStorage.removeItem("AvJO)%zOxm}S/iy");

export default api;
