import { ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ChevronDown, Notebook, ExpandIcon, Database, Moon, Plus, Search, Sun, } from "lucide-react"
import { useWorkspaceStore } from '@/store/workspaceStore'
import { Link } from "react-router-dom"
import { Workspace } from "@/models/workspace"
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from "@/store/themeStore"
import { ToolBarButton } from "@/components/structures/toolbar-button"
import { TooltipProvider } from "@radix-ui/react-tooltip"
// import logoIcon from '@/static/images/logo.svg';


export interface HeaderProps {
    left?: ReactNode,
    middle?: ReactNode,
}

export function Header(props: HeaderProps) {

  const navigate = useNavigate();
  const { activeWorkspace, setActiveWorkspace, workspaces } = useWorkspaceStore();
  const { theme, setTheme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty("color-scheme", "dark")
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.removeProperty("color-scheme")
    }
  }

  const navigateToWorkspace = (workspace: Workspace) => {
    setActiveWorkspace(workspace)
    navigate("/explorer")
  }

  return (
    <header className=" ">
      <div className="container-fluid mx-auto border-b h-[50px] px-3 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {/* <img src={logoIcon} className="w-5 h-5" alt="Invana Studio"/> */}
          {/* <span ><Notebook className="text-xxs" /></span>
          <span className="font-bold">Query Console</span> */}
          {props.left}
         
        </div>

        <div className="flex items-center space-x-2 h-full">
          {props.middle}
        </div>
 
        <div className="flex items-center space-x-2 h-full">

        <TooltipProvider>
          {workspaces.length > 0 ?
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 ">
                  <Database className=" h-4 " />
                  <span >{activeWorkspace?.name || "select workspace"}</span>
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
                    onClick={() => navigateToWorkspace(workspace)}
                    className="cursor-pointer"
                  ><Database className=" h-4 " />
                    {workspace.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to={"/connect"} className="inline-flex">
                    <Plus className="mr-2 h-4 w-4" />Add Workspace
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            : <></>}
          
      

              <ToolBarButton
                icon={theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                tooltip={  theme === 'dark' ? 'light theme' : 'dark theme'}
                onClick={toggleTheme}
              />

              <ToolBarButton
                icon={<ExpandIcon className="h-4 w-4 stroke-2" />}
                tooltip="Full Screen"
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    document.documentElement.requestFullscreen();
                  }
                }}
              />
            </TooltipProvider>
       
        </div>
      </div>
    </header>
  )
}