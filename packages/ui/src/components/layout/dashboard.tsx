import { BarChart3, Clock, Home, LayoutDashboard, LifeBuoy, Package, Search, Settings, Sun, UserCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "#", icon: Home },
  { name: "Dashboard", href: "#", icon: LayoutDashboard },
  { name: "Analytics", href: "#", icon: BarChart3 },
  { name: "Products", href: "#", icon: Package },
  { name: "Activity", href: "#", icon: Clock },
]

const secondaryNavigation = [
  { name: "Help", href: "#", icon: LifeBuoy },
  { name: "Settings", href: "#", icon: Settings },
]

export default function Dashboard() {
  const [open, setOpen] = React.useState(false)
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="grid min-h-screen w-full lg:grid-cols-[50px_1fr]">
        <nav className="hidden border-r border-border bg-background lg:block">
          <div className="flex h-[50px] items-center justify-center border-b">
            <Package className="h-5 w-5 text-foreground" />
          </div>
          <div className="flex flex-col justify-between h-[calc(100vh-100px)]">
            <div className="px-2 py-2">
              {navigation.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={item.href}
                      className="flex h-[50px] w-full items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.name}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="px-2 py-2">
              {secondaryNavigation.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={item.href}
                      className="flex h-[50px] w-full items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.name}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="border-t">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-[50px] w-full justify-center rounded-none p-0 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User Profile</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                John Doe
                <br />
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </nav>
        <div className="flex flex-col">
          <header className="flex h-[50px] items-center border-b border-border bg-background px-4 sm:px-6">
            <div className="flex flex-1 items-center gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <Package className="h-5 w-5 text-foreground" />
                <h1 className="hidden text-sm font-medium text-foreground sm:inline-block">Analytics Dashboard</h1>
              </div>
              <div className="ml-auto flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="relative h-8 w-8 justify-center rounded-full border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground sm:w-40 sm:rounded-md sm:px-3 sm:pr-12 md:w-48 lg:w-64"
                  onClick={() => setOpen(true)}
                >
                  <Search className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline-flex">Search...</span>
                  <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 text-muted-foreground sm:flex">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                  <Command className="rounded-lg border border-border bg-background">
                    <CommandInput placeholder="Type a command or search..." className="border-border" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions" className="text-muted-foreground">
                        <CommandItem className="text-foreground">
                          <Search className="mr-2 h-4 w-4" />
                          <span>Search</span>
                        </CommandItem>
                        <CommandItem className="text-foreground">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          <span>Analytics</span>
                          <CommandShortcut className="text-muted-foreground">⌘A</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </CommandDialog>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-accent hover:text-accent-foreground"
                        onClick={toggleTheme}
                      >
                        <Sun className="h-4 w-4 text-foreground" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle theme</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Settings className="h-4 w-4 text-foreground" />
                        <span className="sr-only">Settings</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Settings</TooltipContent>
                  </Tooltip>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto h-[calc(100vh-80px)] bg-background">
            <div className="h-full p-4 sm:p-6">
              <div className="grid gap-4 sm:gap-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-foreground" />
                      <span className="text-sm font-medium text-foreground">Total Products</span>
                    </div>
                    <div className="mt-3 text-xl font-bold text-foreground sm:mt-4 sm:text-2xl">2,345</div>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-foreground" />
                      <span className="text-sm font-medium text-foreground">Revenue</span>
                    </div>
                    <div className="mt-3 text-xl font-bold text-foreground sm:mt-4 sm:text-2xl">$12,345</div>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-foreground" />
                      <span className="text-sm font-medium text-foreground">Active Users</span>
                    </div>
                    <div className="mt-3 text-xl font-bold text-foreground sm:mt-4 sm:text-2xl">1,234</div>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-foreground" />
                      <span className="text-sm font-medium text-foreground">Active Sessions</span>
                    </div>
                    <div className="mt-3 text-xl font-bold text-foreground sm:mt-4 sm:text-2xl">567</div>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-card">
                  <div className="h-[40vh] w-full" />
                </div>
              </div>
            </div>
          </main>
          <footer className="flex h-[30px] items-center justify-between border-t border-border bg-background px-4 sm:px-6">
            <p className="text-xs text-muted-foreground sm:text-sm">
              © 2024 Acme Inc. All rights reserved.
            </p>
            <nav className="flex gap-2 sm:gap-4">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground hover:underline sm:text-sm">
                Terms
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground hover:underline sm:text-sm">
                Privacy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground hover:underline sm:text-sm">
                Contact
              </a>
            </nav>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  )
}

