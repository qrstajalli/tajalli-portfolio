import React, { useState, useEffect } from 'react';

export const Clock: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const weekday = now.toLocaleDateString([], { weekday: 'short' });
  const day = now.getDate();
  const month = now.toLocaleDateString([], { month: 'short' });
  const time = now.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.82rem',
        fontWeight: 500,
        color: '#f8fafc',
        letterSpacing: '0.01em',
        cursor: 'default',
        padding: '2px 6px',
        borderRadius: '4px',
        userSelect: 'none',
      }}
    >
      <span>{`${weekday} ${day} ${month}`}</span>
      <span style={{ marginLeft: '4px' }}>{time}</span>
    </div>
  );
};
