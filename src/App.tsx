import React, { useState, useCallback } from 'react';
import { Desktop } from './components/desktop/Desktop';
import { BootScreen } from './components/boot/BootScreen';

export const App: React.FC = () => {
  const [isBootOverlayMounted, setIsBootOverlayMounted] = useState<boolean>(true);
  const [isDesktopRevealed, setIsDesktopRevealed] = useState<boolean>(false);

  // Triggered when boot screen finishes holding and begins fading out
  const handleRevealStart = useCallback(() => {
    setIsDesktopRevealed(true);
  }, []);

  // Triggered when boot screen has finished fading out
  const handleBootComplete = useCallback(() => {
    setIsBootOverlayMounted(false);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop Environment */}
      <Desktop isRevealed={isDesktopRevealed} />

      {/* Boot / Power-on Animation Overlay */}
      {isBootOverlayMounted && (
        <BootScreen
          onRevealStart={handleRevealStart}
          onComplete={handleBootComplete}
        />
      )}
    </div>
  );
};

export default App;
