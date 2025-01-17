import { useState, useEffect, useRef } from "react";

interface ComponentSize {
  width: number;
  height: number;
}

function useComponentSize<T extends HTMLElement>() {
  const [size, setSize] = useState<ComponentSize>({ width: 0, height: 0 });
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = ref.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
      };
      setSize({ width, height });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { ref, size };
}

export { useComponentSize };
