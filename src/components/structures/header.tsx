







import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ChevronDown, Moon, Plus, Search, Sun, } from "lucide-react"
import { useWorkspaceStore } from '@/store/workspaceStore'
import { Link, Navigate } from "react-router-dom"


export function Header() {

  const { createWorkspace, activeWorkspace, setActiveWorkspace, workspaces } = useWorkspaceStore();

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddWorkspaceOpen, setIsAddWorkspaceOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Apply dark mode class to body based on isDarkMode state
    console.log("=====isDarkMode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty("color-scheme", "dark")
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.removeProperty("color-scheme")

    }
  }, [isDarkMode]);

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddWorkspace = () => {
       setIsAddWorkspaceOpen(false)
      return <Navigate to={ "/connect"} replace />;
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="border-b  ">
      <div className="container-fluid mx-auto px-4 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold">Invana Studio</span>

        </div>
        <div className="flex items-center space-x-4">
          {workspaces.length > 0 ? 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2 ">
                <span>{activeWorkspace?.name || "select workspace"}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56  ">
              <DropdownMenuLabel>Switch workspace</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search workspaces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8"
                  />
                </div>
              </div>
              <DropdownMenuSeparator />
              {filteredWorkspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => setActiveWorkspace(workspace.id)}
                  className="cursor-pointer"
                >
                  {workspace.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem  className="cursor-pointer">
                <Link to={"/connect"} className="inline-flex"> 
                  <Plus className="mr-2 h-4 w-4" />Add Workspace
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> 
          : <></>}
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>


        </div>
      </div>

 
    </header>
  )
}