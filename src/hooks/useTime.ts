import { useState, useEffect } from 'react';

export interface FormattedTime {
  timeStr: string;
  dateStr: string;
  fullDateStr: string;
  hours: number;
  minutes: number;
}

export function useTime(): FormattedTime {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const dateStr = currentTime.toLocaleDateString([], {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  const fullDateStr = currentTime.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    timeStr,
    dateStr,
    fullDateStr,
    hours: currentTime.getHours(),
    minutes: currentTime.getMinutes(),
  };
}
