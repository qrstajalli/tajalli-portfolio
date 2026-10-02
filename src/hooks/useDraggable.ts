import { useState, useRef, useCallback, useEffect } from 'react';
import { Position } from '../types/desktop';

interface UseDraggableOptions {
  initialPosition: Position;
  elementWidth: number;
  elementHeight: number;
  topOffset?: number;
  bottomOffset?: number;
  onDragEnd?: (pos: Position) => void;
  disabled?: boolean;
}

export function useDraggable({
  initialPosition,
  elementWidth,
  elementHeight,
  topOffset = 32,
  bottomOffset = 80,
  onDragEnd,
  disabled = false,
}: UseDraggableOptions) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);
  const hasMovedRef = useRef(false);

  // Sync position if initialPosition changes externally (e.g. storage load)
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || e.button !== 0) return; // Only primary mouse button

      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        startX: position.x,
        startY: position.y,
      };
      hasMovedRef.current = false;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!dragStartRef.current) return;

        const deltaX = moveEvent.clientX - dragStartRef.current.mouseX;
        const deltaY = moveEvent.clientY - dragStartRef.current.mouseY;

        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
          hasMovedRef.current = true;
          setIsDragging(true);
        }

        if (hasMovedRef.current) {
          const rawX = dragStartRef.current.startX + deltaX;
          const rawY = dragStartRef.current.startY + deltaY;

          // Clamp to viewport bounds
          const maxX = Math.max(10, window.innerWidth - elementWidth - 10);
          const maxY = Math.max(topOffset, window.innerHeight - bottomOffset - elementHeight - 10);

          const clampedX = Math.min(Math.max(10, rawX), maxX);
          const clampedY = Math.min(Math.max(topOffset, rawY), maxY);

          setPosition({ x: clampedX, y: clampedY });
        }
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        if (dragStartRef.current && hasMovedRef.current) {
          setIsDragging(false);
          // Get latest position
          setPosition((latestPos) => {
            if (onDragEnd) {
              onDragEnd(latestPos);
            }
            return latestPos;
          });
        } else {
          setIsDragging(false);
        }
        dragStartRef.current = null;
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [disabled, position.x, position.y, elementWidth, elementHeight, bottomOffset, onDragEnd]
  );

  return {
    position,
    setPosition,
    isDragging,
    handleMouseDown,
    hasMoved: () => hasMovedRef.current,
  };
}
