import { createContext, useContext, useState } from "react";

const ReviewWindow = createContext();

export const useReviewWindow = () => useContext(ReviewWindow);

export default function ReviewWindowProvider({ children }) {
  const [isReviewWindowOpen, setIsReviewWindowOpen] = useState(false);
  const openReviewWindow = () => setIsReviewWindowOpen(true);
  const closeReviewWindow = () => setIsReviewWindowOpen(false);
  return (
    <ReviewWindow.Provider
      value={{
        isReviewWindowOpen,
        openReviewWindow,
        closeReviewWindow,
      }}
    >
      {children}
    </ReviewWindow.Provider>
  );
}
