// Global audio context to reuse across calls
let audioContext: AudioContext | null = null;

// Initialize audio context on first user interaction
const initializeAudioContext = () => {
  if (!audioContext && (window.AudioContext || (window as any).webkitAudioContext)) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Resume audio context if suspended
const resumeAudioContext = async () => {
  if (audioContext && audioContext.state === 'suspended') {
    try {
      await audioContext.resume();
    } catch (error) {
      console.warn('Failed to resume audio context:', error);
    }
  }
};

export const playClickSound = async () => {
  try {
    // Check if Web Audio API is supported
    if (typeof window === 'undefined' || (!window.AudioContext && !(window as any).webkitAudioContext)) {
      console.log('Web Audio API not supported');
      return;
    }

    // Initialize audio context if needed
    const context = initializeAudioContext();
    if (!context) {
      console.log('Failed to initialize audio context');
      return;
    }

    // Resume audio context if suspended (required by browser policies)
    await resumeAudioContext();

    // Create audio nodes
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    // Configure filter for warmth
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, context.currentTime);
    filter.Q.setValueAtTime(1, context.currentTime);

    // Connect audio nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(context.destination);

    // Configure oscillator for a pleasant click sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, context.currentTime + 0.1);

    // Configure gain envelope (attack, decay, sustain, release)
    const now = context.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01); // Quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.05); // Decay
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15); // Release

    // Start and stop the oscillator
    oscillator.start(now);
    oscillator.stop(now + 0.15);

    // Clean up the oscillator after it stops
    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
      filter.disconnect();
    };

  } catch (error) {
    // Fallback: Create a simple beep using the HTML5 Audio API
    try {
      // Create a data URL for a simple beep sound
      const audioData = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';
      const audio = new Audio(audioData);
      audio.volume = 0.1;
      audio.play().catch(() => {
        // Silent fail if audio can't play
        console.log('Audio playback failed');
      });
    } catch (fallbackError) {
      console.log('Fallback audio also failed:', fallbackError);
    }
  }
};

// Initialize audio context on first user interaction
export const initializeAudio = () => {
  const handleFirstInteraction = () => {
    initializeAudioContext();
    resumeAudioContext();
    
    // Remove listeners after first interaction
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
    document.removeEventListener('keydown', handleFirstInteraction);
  };

  // Add listeners for first user interaction
  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('touchstart', handleFirstInteraction, { once: true });
  document.addEventListener('keydown', handleFirstInteraction, { once: true });
};