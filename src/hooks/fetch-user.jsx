import { fetchUserDetails } from "#api/auth.req";
import { getAuthToken } from "#api/index";
import { clearIsFetching, setCurrentUser } from "#redux/user/user.actions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useFetchUser(onSuccess) {
  const dispatch = useDispatch();
  const userQuery = useQuery({
    queryKey: ["user"],
    enabled: !!getAuthToken(),
    retry: 3,
    queryFn: async () => {
      const { data } = await fetchUserDetails();
      dispatch(setCurrentUser(data.user));
      onSuccess?.(data.user);
      return data?.user;
    },
  });
  useEffect(() => {
    if (userQuery.isError) dispatch(clearIsFetching());
  }, [userQuery, dispatch]);
  return userQuery;
}

export default useFetchUser;
