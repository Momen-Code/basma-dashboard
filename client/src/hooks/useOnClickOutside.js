import { useEffect } from "react";

const useOnClickOutside = (containerRef, callBack) => {
  useEffect(() => {
    window.addEventListener("mouseup", containerHandler);
    return () => window.removeEventListener("mouseup", containerHandler);
  }, []);

  const containerHandler = (e) => {
    e.preventDefault();

    if (containerRef.current && !containerRef.current.contains(e.target)) {
      callBack();
    }
  };
};

export default useOnClickOutside;
