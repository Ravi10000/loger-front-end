import { useSearchParams } from "react-router-dom";

export function useFilter(name, initialValue) {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = JSON.parse(searchParams.get(name)) ?? initialValue;

  function setParam(value) {
    if (value instanceof Function) {
      setSearchParams((params) => {
        params.set(name, JSON.stringify(value(param)));
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.set(name, JSON.stringify(value));
        return params;
      });
    }
  }
  function resetParam() {
    setSearchParams((params) => {
      params.delete(name);
      return params;
    });
  }

  return [param, setParam, resetParam];
}
