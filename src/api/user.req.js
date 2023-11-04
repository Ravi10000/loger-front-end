import api from "./index";

export const fetchGuestUsers = () => api.get("/user/guests");
export const updateUserDetails = (data) => api.postForm("/user", data);
export const changePassword = (data) => api.put("/user/password", data);
export const updateProfilePic = (data) =>
  api.putForm("/user/profile-pic", data);
