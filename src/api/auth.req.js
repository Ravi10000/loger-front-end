import api, { getAuthToken } from "./index";

export const fetchUserDetails = () =>
  api.get("/user", {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

export const signupWithEmail = (signupData) => {
  console.log({ signupData });
  return api.post("/auth", signupData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const googleSignIn = (creds) => api.post("/auth/google", creds);

export const loginWithEmail = (creds) => api.post("/auth/login", creds);
