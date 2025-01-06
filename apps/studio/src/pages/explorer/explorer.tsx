import { Compass } from 'lucide-react';
import React from 'react';
import { CanvasFlow } from '@invana/canvas-flow';
import { MainLayout } from '@/layouts/mainLayout';
import { LogoComponent, sideBarBottomNavitems, sideBarTopNavitems } from '../constants';
import { LOCALSTORAGE_KEYS } from '@/constants';



const ExplorerPage: React.FC = () => {
  return (
    <MainLayout
      logo={LogoComponent}
      sideBarBottomNavitems={sideBarBottomNavitems}
      sideBarTopNavitems={sideBarTopNavitems}
      storageKey={LOCALSTORAGE_KEYS.THEME}
      header={
        <>
          <Compass className='h-4 w-4' /> <span className='ml-2 font-bold'>Explorer</span>
        </>
      }

      footer={
        <div className="text-muted-foreground">
          Footer
        </div>
      }
    >
      <CanvasFlow nodes={[]} edges={[]} style={{ width: '100%', height: '100%' }} />
    </MainLayout>
  );
};

export default ExplorerPage;