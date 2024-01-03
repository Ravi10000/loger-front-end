import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function WithShouldMount({ children, excludePathList = [] }) {
  const { pathname } = useLocation();
  const [shouldMount, setShouldMount] = useState(true);
  useEffect(() => {
    let shouldHide = false;
    for (let i = 0; i < excludePathList?.length; i++) {
      if (pathname.includes(excludePathList[i])) {
        shouldHide = true;
        break;
      }
    }
    setShouldMount(!shouldHide);
  }, [pathname, excludePathList]);

  return <>{shouldMount && children}</>;
}

export default WithShouldMount;
