'use client'

import { useState } from 'react'
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
import '@/styles/globals.css'; // Adjust the path as necessary


export function DashboardLayout() {
  const [currentWorkspace, setCurrentWorkspace] = useState('Personal')

  return (
    <div className="flex h-screen bg-background">
      {/* Narrow Navbar with centered icons */}
      <aside className="w-16 flex-shrink-0 border-r flex flex-col justify-between py-4">
        <nav className="flex flex-col items-center space-y-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Menu</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
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
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
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
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
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
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <ChevronDown className="mr-2 h-4 w-4" />
                <span className="truncate">{currentWorkspace}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setCurrentWorkspace('Personal')}>
                Personal
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCurrentWorkspace('Work')}>
                Work
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCurrentWorkspace('School')}>
                School
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your dashboard. Select an option from the menu to get started.</p>
        </main>

        {/* Footer */}
        <footer className="h-[30px] border-t">
          <div className="grid grid-cols-3 h-full">
            <div className="flex items-center justify-start pl-4">
              <p className="text-xs text-muted-foreground">© 2023 Dashboard Inc.</p>
            </div>
            <div className="flex items-center justify-start">
              <p className="text-xs text-muted-foreground">Status: Ready</p>
            </div>
            <div className="flex items-center justify-start">
              <p className="text-xs text-muted-foreground">Code: 200</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}