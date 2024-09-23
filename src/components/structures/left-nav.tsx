"use client"

import { Compass, Network, Activity } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link, useLocation } from 'react-router-dom'

export function LeftNav() {
  const location = useLocation();

  const getLinkClass = (path: string) =>
    location.pathname === path 
      ? "w-full min-w-full p-3 bg-emerald-600 dark:bg-emerald-700 text-white flex flex-col items-center justify-center border-b"
      : "w-full min-w-full p-3 hover:bg-gray-200 dark:hover:bg-gray-800 flex flex-col items-center justify-center border-b";

  return (
    <aside className="w-16 flex-shrink-0 border-r flex flex-col justify-between">
      <TooltipProvider>
        <nav className="flex flex-col items-center w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/explorer" className={getLinkClass("/explorer")}>
                <Compass className="w-6 h-6 mb-1" />
                <span className="text-xs">Explorer</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Explore data</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/modeller" className={getLinkClass("/modeller")}>
                <Network className="w-6 h-6 mb-1" />
                <span className="text-xs">Modeller</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Model data</p>
            </TooltipContent>
          </Tooltip>
        </nav>

        <div className="flex flex-col items-center space-y-4 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/activity" className={getLinkClass("/activity")}>
                <Activity className="w-6 h-6 mb-1" />
                <span className="text-xs">Activity</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>View activity</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </aside>
  );
}
