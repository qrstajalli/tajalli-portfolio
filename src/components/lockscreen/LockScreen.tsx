import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Unlock, ArrowRight, Delete } from 'lucide-react';
import { SYSTEM_USER } from '../../data/systemConfig';
import { useTime } from '../../hooks/useTime';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { timeStr, fullDateStr } = useTime();

  const handleDigit = useCallback(
    (digit: string) => {
      if (isSuccess) return;
      if (pin.length < 6) {
        setIsError(false);
        setErrorMessage('');
        setPin((prev) => prev + digit);
      }
    },
    [pin.length, isSuccess]
  );

  const handleBackspace = useCallback(() => {
    if (isSuccess) return;
    setIsError(false);
    setErrorMessage('');
    setPin((prev) => prev.slice(0, -1));
  }, [isSuccess]);

  const handleSubmit = useCallback(() => {
    if (isSuccess) return;

    if (pin === SYSTEM_USER.pin) {
      setIsSuccess(true);
      setIsError(false);
      setErrorMessage('');
      setTimeout(() => {
        onUnlock();
      }, 550);
    } else {
      setIsError(true);
      setErrorMessage('The PIN is incorrect. Try again.');
      setTimeout(() => {
        setPin('');
      }, 700);
    }
  }, [pin, onUnlock, isSuccess]);

  // Keyboard navigation & number input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSuccess) return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleBackspace, handleSubmit, isSuccess]);

  // Automatic submit if 4 digits entered
  useEffect(() => {
    if (pin.length === 4 && !isSuccess) {
      if (pin === SYSTEM_USER.pin) {
        handleSubmit();
      }
    }
  }, [pin, handleSubmit, isSuccess]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px 20px',
        backgroundImage: `radial-gradient(circle at 50% 25%, rgba(12, 14, 23, 0.4) 0%, rgba(12, 14, 23, 0.85) 100%), url(/assets/images/wallpaper.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'opacity 0.5s ease-out, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isSuccess ? 0 : 1,
        transform: isSuccess ? 'scale(1.06)' : 'scale(1)',
        pointerEvents: isSuccess ? 'none' : 'auto',
      }}
    >
      {/* Top Lock Screen Clock & Date */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
          textShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          {timeStr}
        </h1>
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.85)',
            letterSpacing: '0.01em',
          }}
        >
          {fullDateStr}
        </p>
      </div>

      {/* Center Profile & PIN Entry Box */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '380px',
          width: '100%',
        }}
      >
        {/* User Avatar */}
        <div
          style={{
            position: 'relative',
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            padding: '3px',
            background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.8), rgba(192, 132, 252, 0.5), rgba(56, 189, 248, 0.8))',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #2a3148 0%, #151926 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '1px',
              border: '2px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            TS
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: isSuccess ? '#10b981' : 'rgba(30, 41, 59, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #0c0e17',
              color: '#ffffff',
              transition: 'background-color 0.3s ease',
            }}
          >
            {isSuccess ? <Unlock size={14} /> : <Lock size={13} />}
          </div>
        </div>

        {/* User Name */}
        <h2
          style={{
            fontSize: '1.6rem',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: '4px',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
          }}
        >
          {SYSTEM_USER.name}
        </h2>
        <span
          style={{
            fontSize: '0.88rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '20px',
            letterSpacing: '0.02em',
          }}
        >
          {SYSTEM_USER.role}
        </span>

        {/* Enter PIN text */}
        <p
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.75)',
            marginBottom: '10px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Enter PIN
        </p>

        {/* PIN Dots Display + Submit Button */}
        <div
          className={isError ? 'animate-shake' : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: isError
              ? '1px solid rgba(244, 63, 94, 0.8)'
              : '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '24px',
            padding: '10px 18px',
            boxShadow: isError
              ? '0 0 16px rgba(244, 63, 94, 0.3)'
              : '0 8px 24px rgba(0, 0, 0, 0.3)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', minWidth: '90px', justifyContent: 'center' }}>
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = idx < pin.length;
              return (
                <div
                  key={idx}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: isFilled
                      ? isError
                        ? '#f43f5e'
                        : '#818cf8'
                      : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: isFilled && !isError ? '0 0 8px #818cf8' : 'none',
                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isFilled ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              );
            })}
          </div>

          {/* Submit arrow button */}
          <button
            onClick={handleSubmit}
            disabled={pin.length === 0 || isSuccess}
            aria-label="Submit PIN"
            style={{
              background: pin.length > 0 ? 'rgba(129, 140, 248, 0.9)' : 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: pin.length > 0 ? 'pointer' : 'default',
              transition: 'background 0.2s, transform 0.15s',
              opacity: pin.length > 0 ? 1 : 0.4,
            }}
          >
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Subtle Error Message */}
        <div style={{ minHeight: '22px', marginBottom: '14px' }}>
          {errorMessage && (
            <p
              style={{
                fontSize: '0.82rem',
                color: '#fb7185',
                fontWeight: 500,
                textAlign: 'center',
                animation: 'fadeIn 0.2s ease-out',
              }}
            >
              {errorMessage}
            </p>
          )}
        </div>

        {/* Numeric On-screen Keypad */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            width: '240px',
          }}
        >
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              style={{
                height: '46px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#ffffff',
                fontSize: '1.25rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s, transform 0.1s, border-color 0.15s',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {digit}
            </button>
          ))}

          {/* Backspace Button */}
          <button
            onClick={handleBackspace}
            aria-label="Delete digit"
            style={{
              height: '46px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.15s, transform 0.1s',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)')}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Delete size={20} />
          </button>

          {/* 0 Button */}
          <button
            onClick={() => handleDigit('0')}
            style={{
              height: '46px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#ffffff',
              fontSize: '1.25rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s, transform 0.1s',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)')}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            0
          </button>

          {/* Submit / Enter Key */}
          <button
            onClick={handleSubmit}
            aria-label="Unlock"
            style={{
              height: '46px',
              borderRadius: '12px',
              border: '1px solid rgba(129, 140, 248, 0.4)',
              background: 'rgba(129, 140, 248, 0.25)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.15s, transform 0.1s',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(129, 140, 248, 0.45)')}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(129, 140, 248, 0.25)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Bottom Subtle Status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255, 255, 255, 0.55)',
          fontSize: '0.8rem',
        }}
      >
        <Lock size={13} />
        <span>Tajalli Portfolio • Secure Desktop Workspace</span>
      </div>
    </div>
  );
};
