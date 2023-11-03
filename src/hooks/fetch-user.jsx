import { fetchUserDetails } from "#api/auth.req";
import { clearIsFetching, setCurrentUser } from "#redux/user/user.actions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

function useFetchUser() {
  const dispatch = useDispatch();
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await fetchUserDetails();
      dispatch(setCurrentUser(data.user));
      return data?.user;
    },
  });
  useEffect(() => {
    if (userQuery.isError) dispatch(clearIsFetching());
  }, [userQuery]);
  return userQuery;
}

export default useFetchUser;
// export default connect(null, { setCurrentUser, clearIsFetching })(useFetchUser);
