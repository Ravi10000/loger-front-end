import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useFilter(initialState, name) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState(
    searchParams.get(name) ? JSON.parse(searchParams.get(name)) : initialState
  );
  const setParam = (state) =>
    setSearchParams((params) => {
      params.set(name, JSON.stringify(state));
      return params;
    });
  const resetParam = () =>
    setSearchParams((params) => {
      params.delete(name);
      return params;
    });
  useEffect(() => {
    if (Array.isArray(state))
      if (state?.length) setParam(state);
      else resetParam();
    else if (state) setParam(state);
    else resetParam();
  }, [state]);
  return [state, setState];
}
