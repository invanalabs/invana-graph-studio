"use client"

import { CirclePlus, Network, Activity, HelpCircle, FileText, Search, Compass } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export function LeftNav() {
  const location = useLocation();

  const getLinkClass = (path: string) =>
    location.pathname === path 
      ? "w-full min-w-full p-3 bg-gray-400 dark:bg-gray-800 text-white flex flex-col items-center justify-center border-b"
      : "w-full min-w-full p-3 hover:bg-gray-200 dark:hover:bg-gray-900 flex flex-col items-center justify-center border-b";

  return (
    <aside className="w-14 flex-shrink-0 border-r flex flex-col justify-between">
      <TooltipProvider>
        <nav className="flex flex-col items-center w-full">
        <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/" className=" w-full min-w-full p-3 hover:bg-green-800 text-white py-1
              dark:hover:bg-green-800 bg-green-900 flex flex-col items-center justify-center border-b">
                {/* <Compass className="w-10" /> */}
                <FontAwesomeIcon icon="user-astronaut" className='text-xl' style={{fontSize: "1.6rem"}} />
                <span className="text-xxs">Invana</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Invana Studio</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/add-canvas" className={getLinkClass("/add-canvas") + " text-green-700 dark:text-green-600"}>
                <CirclePlus className="w-5" />
                <span className="text-xxs">Canvas</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>New Canvas</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/graphbook" className={getLinkClass("/graphbook")}>
                <Search className="w-5" />
                <span className="text-xxs">Explorer</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Explorer</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/modeller" className={getLinkClass("/modeller")}>
                <Network className="w-5" />
                <span className="text-xxs">Modeller</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Model data</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/reports" className={getLinkClass("/reports")}>
                <FileText className="w-5 " />
                <span className="text-xxs">Reports</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>View Reports</p>
            </TooltipContent>
          </Tooltip>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/activity" className={getLinkClass("/activity")}>
                <Activity className="w-5 " />
                <span className="text-xxs">Activity</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>View activity</p>
            </TooltipContent>
          </Tooltip> */}
        </nav>

        <div className="flex flex-col items-center space-y-0 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/activity" className={getLinkClass("/activity")}>
                <Activity className="w-5 mb-1" />
                <span className="text-xs">Activity</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>View activity</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/activity" className={getLinkClass("/help")}>
                <HelpCircle className="w-5 mb-1" />
                <span className="text-xs">Help</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Get Help</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </aside>
  );
}
