import { Compass } from 'lucide-react';
import React from 'react';
import { CanvasFlow, CanvasToolBar, defaultFlowCanvasOptions } from '@invana/canvas-flow';
import { LogoComponent, sideBarBottomNavitems, sideBarTopNavitems } from '../constants';
import { LOCALSTORAGE_KEYS, ProductInfo } from '@/constants';
import {
  BlankLayout
} from '@invana/ui';
import { ReactFlowProvider } from '@invana/canvas-flow';
import { data } from './dummy-data'
import { AppHeader, AppFooter, AppMain } from '@invana/ui/themes/app'
import useTheme from '@invana/ui/hooks/useTheme';
import AppHeaderRight from '@/components/header/app-header-right';


const ExplorerPage: React.FC = () => {

  const { theme } = useTheme();

  return (
    <BlankLayout
      logo={LogoComponent}
      sideBarBottomNavitems={sideBarBottomNavitems}
      sideBarTopNavitems={sideBarTopNavitems}
    >

      <ReactFlowProvider fitView>
        <AppHeader
          left={
            <><Compass className='h-4 w-4' /> <span className='font-bold'>Invana | Explorer</span></>
          }
          center={
            <CanvasToolBar />
          }
          right={
            <AppHeaderRight />
          }
        >

        </AppHeader>

        <AppMain>
          <CanvasFlow nodes={data.nodes} edges={data.edges}
            style={{ width: '100%', height: '100%' }}
            canvas={{ ...defaultFlowCanvasOptions.canvas, colorMode: theme }}
            display={{
              plugins: {
                devTools: false,
                miniMap: true,
                controls: false,
                background: true,
                theme: true
              }
            }}
          />
        </AppMain>

        <AppFooter
          right={ProductInfo}
        >

        </AppFooter>
      </ReactFlowProvider>
    </BlankLayout >
  );
};

export default ExplorerPage;