import { Home, Settings, HelpCircle, Menu, ChevronDown, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LeftNavProps {
  currentWorkspace: string;
  setCurrentWorkspace: (workspace: string) => void;
}

export function LeftNav({ currentWorkspace, setCurrentWorkspace }: LeftNavProps) {
  return (
    <aside className="w-16 flex-shrink-0 border-r border-gray-700 flex flex-col justify-between py-4">
      <nav className="flex flex-col items-center space-y-6">
        <TooltipProvider>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Menu</p>
            </TooltipContent>
          </Tooltip> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
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
      </nav>
      <div className="flex flex-col items-center space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 text-gray-100">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="focus:bg-gray-700">Profile</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-gray-700">Settings</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-gray-700">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-start text-gray-300">
              <ChevronDown className="mr-2 h-4 w-4" />
              <span className="truncate">{currentWorkspace}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-800 text-gray-100">
            <DropdownMenuItem onSelect={() => setCurrentWorkspace('Personal')} className="focus:bg-gray-700">
              Personal
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCurrentWorkspace('Work')} className="focus:bg-gray-700">
              Work
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCurrentWorkspace('School')} className="focus:bg-gray-700">
              School
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}