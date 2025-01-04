import { useState, useCallback } from 'react';
import { BackgroundProps, BackgroundVariant, useStoreApi } from '@xyflow/react';

type LayoutDirection = 'TB' | 'LR' | 'BT' | 'RL';

// interface CanvasSettings {
//   background: BackgroundProps;
//   layoutDirection: LayoutDirection;
// }

const useCanvasSettings = () => {

  const store = useStoreApi()


  // Manage Viewport Lock
  const [lockViewport, setLockViewport] = useState<boolean>(false);
  const toggleLockViewport = useCallback(() => {
    setLockViewport((prev) => {
      const newLockViewport = !prev;
      store.setState({
        nodesDraggable: !newLockViewport,
        nodesConnectable: !newLockViewport,
        elementsSelectable: !newLockViewport,
      });
      return newLockViewport;
    });
  }, []);


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

    lockViewport,
    setLockViewport,
    toggleLockViewport
  };
};

export default useCanvasSettings;