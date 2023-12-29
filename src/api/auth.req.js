import api, { getAuthToken, setAuthToken } from "./index";

export const fetchUserDetails = async () => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (response?.data?.accessToken) {
    setAuthToken(response.data.accessToken);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.accessToken}`;
  }
  return response;
};

export const signupWithEmail = (signupData) =>
  api.post("/auth", signupData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const googleSignIn = (creds) => api.post("/auth/google", creds);

export const loginWithEmail = async (creds) => {
  const response = await api.post("/auth/login", creds);
  if (response?.data?.accessToken) {
    setAuthToken(response.data.accessToken);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.accessToken}`;
  }
  return response;
};

export const generateOTP = (creds) => api.post("/auth/phone", creds);
export const verifyOTP = (creds) => api.put("/auth/phone", creds);

export const googleLogin = (userInfo) =>
  api.post(`/auth/login/google`, userInfo);
