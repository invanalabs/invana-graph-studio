import { MainLayout } from '@invana/ui';
import { Compass } from 'lucide-react';
import React from 'react';
import { CanvasFlow } from '@invana/canvas-flow';


const ExplorerPage: React.FC = () => {
  return (
    <MainLayout headerTitle={
      <>
        <Compass className='h-4 w-4' /> <span className='font-bold'>Explorer</span>
      </>
    }>
      <CanvasFlow />
    </MainLayout>
  );
};

export default ExplorerPage;