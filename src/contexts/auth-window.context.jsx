import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const SigninWindowContext = createContext();

export const useAuthWindow = () => useContext(SigninWindowContext);

AuthWindowProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function AuthWindowProvider({ children }) {
  const [authWindow, setAuthWindow] = useState(false);
  // const openAuthWindow = (type) => setAuthWindow(type || "signin");
  const openAuthWindow = (authProps) =>
    setAuthWindow(authProps || { type: "signin", method: "phone" });
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
