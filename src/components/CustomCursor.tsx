import { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;
    
    const mouseMove = (e: MouseEvent) => {
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);
    
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    // Handle interactive elements
    const handleInteractiveEnter = () => setCursorVariant('hover');
    const handleInteractiveLeave = () => setCursorVariant('default');

    // Add event listeners
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseenter', mouseEnter);
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mouseup', mouseUp);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"], input, textarea, select, .cursor-pointer'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleInteractiveEnter);
      el.addEventListener('mouseleave', handleInteractiveLeave);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mouseup', mouseUp);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleInteractiveEnter);
        el.removeEventListener('mouseleave', handleInteractiveLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) ${isClicking ? 'scale(0.8)' : 'scale(1)'}`,
        }}
      >
        {/* Outer Ring */}
        <div
          className={`rounded-full border transition-all duration-300 ease-out ${
            cursorVariant === 'hover'
              ? 'w-8 h-8 border-blue-500 bg-blue-500/10'
              : 'w-6 h-6 border-gray-400 dark:border-gray-500'
          }`}
          style={{
            borderWidth: '1px',
          }}
        />

        {/* Inner Dot */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out ${
            cursorVariant === 'hover'
              ? 'w-2 h-2 bg-blue-500'
              : 'w-1.5 h-1.5 bg-gray-600 dark:bg-gray-300'
          }`}
        />

        {/* Hover Glow Effect */}
        {cursorVariant === 'hover' && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-blue-500/5 animate-pulse"
            style={{
              filter: 'blur(4px)',
            }}
          />
        )}

        {/* Click Ripple */}
        {isClicking && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/50 animate-ping"
            style={{
              width: '20px',
              height: '20px',
            }}
          />
        )}
      </div>

      {/* Follower Dot (Delayed) */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out ${
            cursorVariant === 'hover'
              ? 'w-1 h-1 bg-blue-400/60'
              : 'w-0.5 h-0.5 bg-gray-400/40 dark:bg-gray-400/60'
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;