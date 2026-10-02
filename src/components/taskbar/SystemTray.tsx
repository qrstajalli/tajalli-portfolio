import React from 'react';
import { Wifi, Volume2, Battery, ChevronUp } from 'lucide-react';
import { useTime } from '../../hooks/useTime';

export const SystemTray: React.FC = () => {
  const { timeStr, dateStr, fullDateStr } = useTime();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        height: '100%',
      }}
    >
      {/* Hidden Icons Caret */}
      <button
        aria-label="Show hidden icons"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '34px',
          borderRadius: '6px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.75)',
          cursor: 'pointer',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <ChevronUp size={15} />
      </button>

      {/* Network / Volume / Battery cluster (Windows 11 grouped pill) */}
      <div
        title="Internet access • Volume 80% • Battery 100%"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0 8px',
          height: '34px',
          borderRadius: '6px',
          color: 'rgba(255, 255, 255, 0.85)',
          cursor: 'default',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Wifi size={14} />
        <Volume2 size={14} />
        <Battery size={14} />
      </div>

      {/* Time & Date cluster */}
      <div
        title={fullDateStr}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: '0 10px',
          height: '36px',
          borderRadius: '6px',
          cursor: 'default',
          transition: 'background-color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#f8fafc',
            lineHeight: 1.15,
          }}
        >
          {timeStr}
        </span>
        <span
          style={{
            fontSize: '0.72rem',
            color: 'rgba(255, 255, 255, 0.65)',
            lineHeight: 1.15,
          }}
        >
          {dateStr}
        </span>
      </div>
    </div>
  );
};
