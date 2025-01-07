import { Compass } from 'lucide-react';
import React from 'react';
import { CanvasFlow, CanvasToolBar, defaultFlowCanvasOptions } from '@invana/canvas-flow';
import { LogoComponent, sideBarBottomNavitems, sideBarTopNavitems } from '../constants';
import { LOCALSTORAGE_KEYS } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage, BlankLayout, Separator, Tooltip, TooltipContent, TooltipTrigger, useThemeStore } from '@invana/ui';
import { ReactFlowProvider } from '@invana/canvas-flow';
import { data } from './dummy-data'
import { AppHeader, AppFooter, AppMain } from '@invana/ui/themes/app'
import useTheme from '@invana/ui/hooks/useTheme';




const ExplorerPage: React.FC = () => {


  const { theme } = useTheme()

  console.log("=====ExplorerPage theme", theme)

  return (
    <BlankLayout
      logo={LogoComponent}
      sideBarBottomNavitems={sideBarBottomNavitems}
      sideBarTopNavitems={sideBarTopNavitems}
      storageKey={LOCALSTORAGE_KEYS.THEME}
    >

      <ReactFlowProvider fitView>
        <AppHeader>
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center gap-2 text-foreground text-xl">
              {/* header left */}
              <Compass className='h-4 w-4' /> <span className='font-bold'>Explorer</span>
            </div>

            <div className="flex-1 flex justify-center items-center gap-1 sm:gap-2">
              {/* header middle */}
              <CanvasToolBar />
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
                    <AvatarFallback className='bg-emerald-700 text-white font-bold'>A</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>Anonymous User</TooltipContent>
              </Tooltip>
            </div>
          </div>
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

        <AppFooter>
          <div className="text-muted-foreground">
            Footer
          </div>
        </AppFooter>
      </ReactFlowProvider>
    </BlankLayout >
  );
};

export default ExplorerPage;