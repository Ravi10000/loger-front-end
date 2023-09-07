import { createContext, useContext, useState } from "react";

const SigninWindowContext = createContext();

export const useAuthWindow = () => useContext(SigninWindowContext);

export default function AuthWindowProvider({ children }) {
  const [authWindow, setAuthWindow] = useState(false);
  const openAuthWindow = (type) => setAuthWindow(type || "signin");
  const closeAuthWindow = () => setAuthWindow(false);
  return (
    <SigninWindowContext.Provider
      value={{
        authWindow,
        openAuthWindow,
        closeAuthWindow,
      }}
    >
      {children}
    </SigninWindowContext.Provider>
  );
}
