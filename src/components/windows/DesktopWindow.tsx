import React, { useRef, useState } from 'react';
import { Minus, Square, Copy, X, Folder, Sparkles } from 'lucide-react';
import { WindowState } from '../../types/desktop';

interface DesktopWindowProps {
  windowState: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (pos: { x: number; y: number }) => void;
}

export const DesktopWindow: React.FC<DesktopWindowProps> = ({
  windowState,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; mouseX: number; mouseY: number } | null>(null);

  // If minimized, don't render
  if (windowState.isMinimized || !windowState.isOpen) {
    return null;
  }

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return; // Cannot drag while maximized
    if (e.button !== 0) return;

    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: windowState.position.x,
      startY: windowState.position.y,
      mouseX: e.clientX,
      mouseY: e.clientY,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragRef.current) return;

      const deltaX = moveEvent.clientX - dragRef.current.mouseX;
      const deltaY = moveEvent.clientY - dragRef.current.mouseY;

      const newX = dragRef.current.startX + deltaX;
      const newY = dragRef.current.startY + deltaY;

      // Bound within viewport and above taskbar
      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - 200));
      const clampedY = Math.max(0, Math.min(newY, window.innerHeight - 48 - 60));

      onMove({ x: clampedX, y: clampedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const isMax = windowState.isMaximized;

  return (
    <div
      onMouseDown={onFocus}
      style={{
        position: 'absolute',
        left: isMax ? 0 : `${windowState.position.x}px`,
        top: isMax ? 0 : `${windowState.position.y}px`,
        width: isMax ? '100vw' : `${windowState.size.width}px`,
        height: isMax ? 'calc(100vh - 48px)' : `${windowState.size.height}px`,
        maxWidth: isMax ? '100vw' : 'calc(100vw - 20px)',
        maxHeight: isMax ? 'calc(100vh - 48px)' : 'calc(100vh - 68px)',
        zIndex: windowState.zIndex,
        borderRadius: isMax ? 0 : '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(20, 24, 36, 0.92)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: isMax ? 'none' : isActive ? '1px solid rgba(129, 140, 248, 0.45)' : '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: isActive
          ? '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 20px rgba(129, 140, 248, 0.15)'
          : '0 16px 40px rgba(0, 0, 0, 0.45)',
        transition: isDragging
          ? 'none'
          : 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Window Title Bar */}
      <div
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={onMaximize}
        style={{
          height: '42px',
          minHeight: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '14px',
          paddingRight: '6px',
          background: isActive
            ? 'linear-gradient(90deg, rgba(35, 42, 64, 0.95) 0%, rgba(26, 31, 48, 0.95) 100%)'
            : 'rgba(22, 26, 38, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          cursor: isMax ? 'default' : 'grab',
          userSelect: 'none',
        }}
      >
        {/* Title & Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          <Folder size={17} color="#fbbf24" />
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              color: isActive ? '#f8fafc' : 'rgba(255, 255, 255, 0.65)',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {windowState.title}
          </span>
        </div>

        {/* Windows Control Buttons (Minimize, Maximize, Close) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            aria-label="Minimize Window"
            style={{
              width: '36px',
              height: '30px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Minus size={14} />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            aria-label={isMax ? 'Restore Window' : 'Maximize Window'}
            style={{
              width: '36px',
              height: '30px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {isMax ? <Copy size={12} /> : <Square size={12} />}
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close Window"
            style={{
              width: '36px',
              height: '30px',
              borderRadius: '6px',
              border: 'none',
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ef4444';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
            }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Explorer Path / Breadcrumb Bar */}
      <div
        style={{
          padding: '7px 16px',
          background: 'rgba(15, 18, 28, 0.6)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.78rem',
          color: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <span>This PC</span>
        <span>&rsaquo;</span>
        <span>Tajalli Portfolio</span>
        <span>&rsaquo;</span>
        <span style={{ color: '#38bdf8', fontWeight: 500 }}>{windowState.title}</span>
      </div>

      {/* Window Body — Minimal, clean placeholder ready for future content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(30, 38, 58, 0.4) 0%, rgba(14, 17, 26, 0.6) 100%)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.25) 0%, rgba(192, 132, 252, 0.15) 100%)',
            border: '1px solid rgba(129, 140, 248, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Folder size={32} color="#818cf8" />
        </div>

        <h3
          style={{
            fontSize: '1.35rem',
            fontWeight: 600,
            color: '#f8fafc',
            marginBottom: '8px',
            letterSpacing: '-0.01em',
          }}
        >
          {windowState.title}
        </h3>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '20px',
            background: 'rgba(129, 140, 248, 0.12)',
            border: '1px solid rgba(129, 140, 248, 0.25)',
            color: '#c7d2fe',
            fontSize: '0.78rem',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          <Sparkles size={13} color="#a5b4fc" />
          <span>Portfolio Section Architecture</span>
        </div>

        <p
          style={{
            fontSize: '0.88rem',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '380px',
            lineHeight: 1.5,
          }}
        >
          This window represents the <strong style={{ color: '#f1f5f9' }}>{windowState.title}</strong> module. Content architecture and interactive views will be populated in subsequent phases.
        </p>
      </div>

      {/* Window Status Bar */}
      <div
        style={{
          height: '24px',
          minHeight: '24px',
          padding: '0 14px',
          background: 'rgba(14, 17, 26, 0.9)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          color: 'rgba(255, 255, 255, 0.45)',
        }}
      >
        <span>1 item selected</span>
        <span>Tajalli Desktop OS</span>
      </div>
    </div>
  );
};
