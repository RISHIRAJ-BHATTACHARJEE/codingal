import { useEffect, useCallback, useState, useRef } from "react";

export const useCountdown = (initialTime: number, onEnd?: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const stopTimer = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      stopTimer();
      onEnd?.();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => stopTimer();
  }, [timeLeft, onEnd, stopTimer]);

  return { timeLeft, stopTimer };
};