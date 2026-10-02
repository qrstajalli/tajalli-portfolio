import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SYSTEM_USER } from '../../data/systemConfig';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(() => {
    if (isLoggingIn || isUnlocked) return;

    if (pin === SYSTEM_USER.pin) {
      setIsError(false);
      setIsLoggingIn(true);
      // Windows-like "Welcome" state then unlock
      setTimeout(() => {
        setIsUnlocked(true);
        setTimeout(() => {
          onUnlock();
        }, 350);
      }, 700);
    } else {
      setIsError(true);
      // Keep error message, clear input and re-focus
      setTimeout(() => {
        setPin('');
        inputRef.current?.focus();
      }, 500);
    }
  }, [pin, isLoggingIn, isUnlocked, onUnlock]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleContainerClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#004e8c',
        backgroundImage: 'radial-gradient(circle at 50% 45%, #005a9e 0%, #003a66 100%)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
        opacity: isUnlocked ? 0 : 1,
        transition: 'opacity 0.35s ease-out',
        pointerEvents: isUnlocked ? 'none' : 'auto',
      }}
    >
      {/* Centered Windows User Profile Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-40px', // Perfectly centers visually on screen
        }}
      >
        {/* Windows Circular Avatar */}
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '22px',
          }}
        >
          {/* Authentic Windows User Line Icon */}
          <svg
            width="110"
            height="110"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head circle */}
            <circle cx="50" cy="36" r="18" stroke="#ffffff" strokeWidth="4" />
            {/* Shoulders arch */}
            <path
              d="M 22 84 C 22 65, 36 59, 50 59 C 64 59, 78 65, 78 84"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Display Name */}
        <h1
          style={{
            fontSize: '1.95rem',
            fontWeight: 350,
            color: '#ffffff',
            letterSpacing: '0.01em',
            marginBottom: '20px',
            textAlign: 'center',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          }}
        >
          {SYSTEM_USER.name}
        </h1>

        {/* Windows PIN Input / Welcome State */}
        {isLoggingIn ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              minHeight: '60px',
            }}
          >
            {/* Windows Circular Spinner */}
            <div
              style={{
                width: '28px',
                height: '28px',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                borderTopColor: '#ffffff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span
              style={{
                fontSize: '1.05rem',
                color: '#ffffff',
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              Welcome
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Input Row: Input box with eye icon and submit arrow */}
            <div
              className={isError ? 'animate-shake' : ''}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '2px solid rgba(0, 0, 0, 0.6)',
                width: '272px',
                height: '34px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
              }}
            >
              <input
                ref={inputRef}
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => {
                  setIsError(false);
                  setPin(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="PIN"
                aria-label="PIN"
                autoComplete="off"
                style={{
                  flex: 1,
                  height: '100%',
                  border: 'none',
                  outline: 'none',
                  padding: '0 10px',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  letterSpacing: showPin ? 'normal' : '2px',
                  color: '#000000',
                  backgroundColor: 'transparent',
                }}
              />

              {/* Reveal Password Eye Button */}
              {pin.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                  title={showPin ? 'Hide PIN' : 'Show PIN'}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '0 6px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#333333',
                  }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              )}

              {/* Submit Arrow Button */}
              <button
                type="button"
                onClick={handleSubmit}
                aria-label="Submit PIN"
                title="Submit"
                style={{
                  width: '32px',
                  height: '100%',
                  border: 'none',
                  borderLeft: '1px solid #d1d5db',
                  backgroundColor: '#f3f4f6',
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Error Message */}
            <div style={{ minHeight: '26px', marginTop: '6px', textAlign: 'center' }}>
              {isError && (
                <span
                  style={{
                    fontSize: '0.84rem',
                    color: '#ffffff',
                    fontWeight: 400,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  The PIN is incorrect. Try again.
                </span>
              )}
            </div>

            {/* "Sign-in options" */}
            <div
              style={{
                marginTop: '10px',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.78)',
                cursor: 'pointer',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)')}
            >
              Sign-in options
            </div>
          </div>
        )}
      </div>

      {/* Bottom-Right System Icons (Network, Accessibility, Power) */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          color: 'rgba(255, 255, 255, 0.88)',
        }}
      >
        {/* Network / Ethernet Computer Icon */}
        <div
          title="Internet access"
          style={{
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Monitor screen */}
            <rect x="2" y="3" width="16" height="12" rx="1" />
            <path d="M6 15v3h8v-3" />
            {/* Small network node / adapter */}
            <rect x="15" y="15" width="7" height="6" rx="1" />
            <line x1="17" y1="18" x2="20" y2="18" />
          </svg>
        </div>

        {/* Accessibility / Ease of Access Icon */}
        <div
          title="Ease of Access"
          style={{
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Dotted ease of access clock / meter */}
            <circle cx="12" cy="12" r="9" strokeDasharray="4 2.5" />
            <polyline points="12 7 12 12 15.5 15.5" />
          </svg>
        </div>

        {/* Power Button Icon */}
        <div
          title="Power"
          style={{
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="11" />
          </svg>
        </div>
      </div>
    </div>
  );
};
