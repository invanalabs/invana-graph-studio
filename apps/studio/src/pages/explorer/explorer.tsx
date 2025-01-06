import { Compass, Search } from 'lucide-react';
import React from 'react';
import { CanvasFlow } from '@invana/canvas-flow';
import { MainLayout } from '@/layouts/mainLayout';
import { LogoComponent, sideBarBottomNavitems, sideBarTopNavitems } from '../constants';
import { LOCALSTORAGE_KEYS } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage, Separator, Tooltip, TooltipContent, TooltipTrigger } from '@invana/ui';



const ExplorerPage: React.FC = () => {
  return (
    <MainLayout
      logo={LogoComponent}
      sideBarBottomNavitems={sideBarBottomNavitems}
      sideBarTopNavitems={sideBarTopNavitems}
      storageKey={LOCALSTORAGE_KEYS.THEME}
      header={
        <div className="flex flex-1 items-center gap-4">
          <div className="flex items-center gap-2 text-foreground">
            {/* header left */}
            <Compass className='h-4 w-4' /> <span className='font-bold'>Explorer</span>
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {/* header middle */}
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
      <CanvasFlow nodes={[]} edges={[]} style={{ width: '100%', height: '100%' }} />
    </MainLayout>
  );
};

export default ExplorerPage;