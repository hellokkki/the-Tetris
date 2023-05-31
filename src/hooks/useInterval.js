import { useEffect, useRef, useCallback } from "react"

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  const intervalId = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    intervalId.current = setInterval(tick, delay);
    return () => clearInterval(intervalId.current);
  }, [delay]);

  const stopInterval = useCallback(() => {
    clearInterval(intervalId.current);
  }, []);

  return stopInterval;
};