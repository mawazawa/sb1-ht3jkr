import { useState, useCallback } from 'react';

export const useSendButton = (onParticles: () => void) => {
  const [clickCount, setClickCount] = useState(0);

  const handleSendClick = useCallback(() => {
    const newCount = (clickCount + 1) % 10;
    setClickCount(newCount);
    
    if (newCount === 0) {
      onParticles();
    }
  }, [clickCount, onParticles]);

  return { clickCount, handleSendClick };
};