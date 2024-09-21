import { HelpCircle, Table, Search, GitMerge } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link } from 'react-router-dom';


interface LeftNavProps {
  currentWorkspace: string;
  setCurrentWorkspace: (workspace: string) => void;
}

export function LeftNav({ currentWorkspace, setCurrentWorkspace }: LeftNavProps) {
  return (
    <aside className="w-16 flex-shrink-0 border-r flex flex-col justify-between">
      <nav className="flex flex-col items-center ">
        <TooltipProvider>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/modeller" className="text-gray-400 hover:text-gray-100 relative transition 
                   duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-100 p-5  border-b" >
                <GitMerge className="h-5 w-5" />
                <span className="sr-only">Modeller</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Modeller</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/explorer" className="text-gray-400 hover:text-gray-100 relative transition 
                   duration-300 ease-in-out hover:bg-gray-600 hover:text-gray-100 p-5 border-b" >
                <Search className="h-5 w-5" />
                <span className="sr-only">Explorer</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Explorer</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
            <Link href="/data"  className="text-gray-400 hover:text-gray-100 relative transition 
                   duration-300 ease-in-out hover:bg-gray-600 hover:text-gray-100 p-5 border-b" >
            <Table className="h-5 w-5" />
                <span className="sr-only">Data Management</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Data Management</p>
            </TooltipContent>
          </Tooltip>
 
        </TooltipProvider>
      </nav>
      <div className="flex flex-col items-center space-y-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Help</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  )
}