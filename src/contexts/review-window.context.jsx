import { createContext, useContext, useState } from "react";

const ReviewWindow = createContext();

export const useReviewWindow = () => useContext(ReviewWindow);

export default function ReviewWindowProvider({ children }) {
  const [propertyReviewing, setPropertyReviewing] = useState(false);
  const closeReviewWindow = () => setPropertyReviewing(false);
  return (
    <ReviewWindow.Provider
      value={{
        propertyReviewing,
        setPropertyReviewing,
        closeReviewWindow,
      }}
    >
      {children}
    </ReviewWindow.Provider>
  );
}
