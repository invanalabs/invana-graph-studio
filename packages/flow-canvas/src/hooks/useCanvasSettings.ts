import { useState, useCallback } from 'react';
import { BackgroundProps, BackgroundVariant } from '@xyflow/react';

type LayoutDirection = 'TB' | 'LR' | 'BT' | 'RL';

// interface CanvasSettings {
//   background: BackgroundProps;
//   layoutDirection: LayoutDirection;
// }

const useCanvasSettings = () => {
  const [background, setBackground_] = useState<BackgroundProps>({
    color: '#ffffff',
    variant: BackgroundVariant.Dots, // Options: 'dots', 'lines', 'cross'
    gap: 16,
    size: 1,
  });

  const [layoutDirection, setLayoutDirection_] = useState<LayoutDirection>('TB');

  const setBackground = useCallback((newBackground: Partial<BackgroundProps>) => {
    setBackground_((prev) => ({ ...prev, ...newBackground }));
  }, []);

  const setLayoutDirection = useCallback((newDirection: LayoutDirection) => {
    setLayoutDirection_(newDirection);
  }, []);

  return {
    background,
    setBackground,

    layoutDirection,
    setLayoutDirection,
  };
};

export default useCanvasSettings;