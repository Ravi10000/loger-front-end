import api from "#api/index";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useReviews({ propertyId, limit = 4, status = "active", onSuccess }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const nextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const {
    data: reviews,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["reviews", [propertyId, currentPage, status, limit]],
    enabled: !!propertyId,
    queryFn: async () => {
      const res = await api.get(
        `/review/${propertyId}?page=${currentPage}&status=${status}&limit=${limit}`
      );
      if (res?.data?.totalPages) setTotalPages(res?.data?.totalPages);
      onSuccess?.(res?.data?.reviews);
      return res?.data?.reviews;
    },
  });
  return {
    reviews,
    isLoading,
    isFetching,
    error,
    prevPage,
    nextPage,
    totalPages,
    currentPage,
  };
}

export default useReviews;
