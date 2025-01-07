import { Compass, Search } from 'lucide-react';
import React, { useRef } from 'react';
import { CanvasFlow, CanvasToolBar, ReactFlowInstance } from '@invana/canvas-flow';
import { MainLayout } from '@/layouts/mainLayout';
import { LogoComponent, sideBarBottomNavitems, sideBarTopNavitems } from '../constants';
import { LOCALSTORAGE_KEYS } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage, Separator, Tooltip, TooltipContent, TooltipTrigger } from '@invana/ui';
import { ReactFlowProvider, ReactFlowInstane } from '@invana/canvas-flow';
import { data } from './dummy-data'

const ExplorerPage: React.FC = () => {

  const reactFlowInstance = useRef<ReactFlowInstance | null>(null); // Here we define the type for reactFlowInstance


  const handleZoomIn = () => {
    console.log("handleZoomIn", reactFlowInstance.current);
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (reactFlowInstance.current) {
      reactFlowInstance.current.zoomOut();
    }
  };



  return (
    <MainLayout
      logo={LogoComponent}
      sideBarBottomNavitems={sideBarBottomNavitems}
      sideBarTopNavitems={sideBarTopNavitems}
      storageKey={LOCALSTORAGE_KEYS.THEME}
      header={
        <div className="flex flex-1 items-center gap-4">
          <div className="flex items-center gap-2 text-foreground text-xl">
            {/* header left */}
            <Compass className='h-4 w-4' /> <span className='font-bold'>Explorer</span>
          </div>

          <div className="flex-1 flex justify-center items-center gap-1 sm:gap-2">
            {/* header middle */}
            {/* <CanvasToolBar /> */}


            {/* <div style={{ width: '300px', padding: '20px' }}>
              <h3>External Controls</h3>
              <button onClick={handleZoomIn}>Zoom In</button>
              <button onClick={handleZoomOut}>Zoom Out</button>
            </div> */}

          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {/* header right */}
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://github.com/invana/invana-studio" target="_blank" className="ml-2 mr-2">
                  <img src="https://img.shields.io/github/stars/invana/invana-studio?style=social"
                    alt="stars" className="  w-20 " />
                </a>
              </TooltipTrigger>
              <TooltipContent>Stars</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="h-6 ml-2" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>Anonymous User</TooltipContent>
            </Tooltip>
          </div>
        </div>
      }

      footer={
        <div className="text-muted-foreground">
          Footer
        </div>
      }
    >




      <ReactFlowProvider>
        <CanvasFlow ref={reactFlowInstance}
          nodes={data.nodes} edges={data.edges} style={{ width: '100%', height: '100%' }} />
      </ReactFlowProvider>
    </MainLayout>
  );
};

export default ExplorerPage;