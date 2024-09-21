







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
import { Label } from "@/components/ui/label"
import { ChevronDown, LogOut, Moon, Plus, Search, Settings, Sun, User } from "lucide-react"

// Mock data for workspaces
const initialWorkspaces = [
  { id: 1, name: "Personal", connectionString: "mongodb://localhost:27017/personal" },
  { id: 2, name: "Team A", connectionString: "mongodb://localhost:27017/teamA" },
  { id: 3, name: "Team B", connectionString: "mongodb://localhost:27017/teamB" },
  { id: 4, name: "Client Project", connectionString: "mongodb://localhost:27017/client" },
]


interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  initialWorkspaces: any
}


export function Header({ theme, toggleTheme, initialWorkspaces }: HeaderProps) {

  const [workspaces, setWorkspaces] = useState(initialWorkspaces)
  const [currentWorkspace, setCurrentWorkspace] = useState(workspaces[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddWorkspaceOpen, setIsAddWorkspaceOpen] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState("")
  const [newConnectionString, setNewConnectionString] = useState("")
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
    if (newWorkspaceName.trim() && newConnectionString.trim()) {
      const newWorkspace = {
        id: workspaces.length + 1,
        name: newWorkspaceName.trim(),
        connectionString: newConnectionString.trim(),
      }
      setWorkspaces([...workspaces, newWorkspace])
      setCurrentWorkspace(newWorkspace)
      setNewWorkspaceName("")
      setNewConnectionString("")
      setIsAddWorkspaceOpen(false)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="border-b  ">
      <div className="container-fluid mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold">Invana Studio</span>

        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2 ">
                <span>{currentWorkspace.name}</span>
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
                  onClick={() => setCurrentWorkspace(workspace)}
                  className="cursor-pointer"
                >
                  {workspace.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setIsAddWorkspaceOpen(true)} className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                Add Workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>


        </div>
      </div>

      <Dialog open={isAddWorkspaceOpen} onOpenChange={setIsAddWorkspaceOpen}>
        <DialogContent className="sm:max-w-[540px]  text-gray-400 border-1 ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add New Workspace</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workspace-name" className="text-right">
                Name
              </Label>
              <Input
                id="workspace-name"
                placeholder="Enter workspace name"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                className="col-span-3 "
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="connection-string" className="text-right">
                Connection String
              </Label>
              <Input
                id="connection-string"
                placeholder="Enter connection string"
                value={newConnectionString}
                onChange={(e) => setNewConnectionString(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddWorkspaceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddWorkspace}>Add Workspace</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}