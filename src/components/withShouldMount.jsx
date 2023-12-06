import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function WithShouldMount({ children, excludePathList = [] }) {
  const { pathname } = useLocation();
  const [shouldMount, setShouldMount] = useState(true);
  useEffect(() => {
    for (let i = 0; i < excludePathList?.length; i++) {
      if (pathname.includes(excludePathList[i])) {
        setShouldMount(false);
        break;
      }
    }
  }, [pathname]);

  return <>{shouldMount && children}</>;
}

export default WithShouldMount;
