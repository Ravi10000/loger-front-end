import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useSearchItem(name, defaultValue = "") {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paramValue, setParamValue] = useState(
    searchParams.get(name) ?? defaultValue
  );

  //   useEffect(() => {
  //     console.log({ paramValue, [name]: searchParams.get(name) });
  //     if (paramValue != searchParams.get(name)) {
  //       setSearchParams((params) => {
  //         console.log("setting new params");
  //         params.set(name, paramValue);
  //         return params;
  //       });
  //     }
  //   }, [paramValue, name, setSearchParams]);

  return [paramValue, setParamValue];
}

export default useSearchItem;
