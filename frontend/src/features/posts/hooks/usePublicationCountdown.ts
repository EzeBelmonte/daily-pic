import { useEffect, useState } from "react";

export function usePublicationCountdown(
  targetDate: string | null
) {
  const getRemainingTime = () => {
    if (!targetDate) {
      return 0
    }

    return Math.max(
      0,
      new Date(targetDate).getTime() - Date.now()
    );
  }

  const [remaining, setRemaining] = useState(
    getRemainingTime()
  );

  useEffect(() => {
    if (!targetDate) {
      setRemaining(0);
      return;
    }

    const interval = setInterval(() => {
      setRemaining(getRemainingTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [targetDate]);

  return remaining;
}