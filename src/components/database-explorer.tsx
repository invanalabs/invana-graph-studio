import { useState, useEffect } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { GripVertical } from 'lucide-react'
import Header from './components/Header'
import LeftNav from './components/LeftNav'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import MainTop from './components/MainTop'
import MainBody from './components/MainBody'
import MainBottom from './components/MainBottom'
import Footer from './components/Footer'
import QueryConsole from './components/QueryConsole'

export function DatabaseExplorerComponent() {
  const [tables, setTables] = useState<string[]>([])
  const [newTableName, setNewTableName] = useState('')
  const [showRightSidebar, setShowRightSidebar] = useState(true)
  const [leftSidebarContent, setLeftSidebarContent] = useState<'database' | 'settings' | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [selectedNavItem, setSelectedNavItem] = useState<string | null>(null)
  const [showBottomPanel, setShowBottomPanel] = useState(false)
  const [bottomPanelTab, setBottomPanelTab] = useState<'activity' | 'connectors'>('activity')
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null)
  const [showQueryConsole, setShowQueryConsole] = useState(false)
  const [showCommandDialog, setShowCommandDialog] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setShowCommandDialog((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const addTable = () => {
    if (newTableName) {
      setTables([...tables, newTableName])
      setNewTableName('')
    }
  }

  const toggleLeftSidebar = (content: 'database' | 'settings') => {
    setLeftSidebarContent(prev => prev === content ? null : content)
    setSelectedNavItem(content)
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const toggleQueryConsole = () => {
    setShowQueryConsole(prev => !prev)
    setShowBottomPanel(false)
  }

  const toggleBottomPanel = (tab: 'activity' | 'connectors') => {
    setBottomPanelTab(tab)
    setShowBottomPanel(prev => !prev)
    setShowQueryConsole(false)
  }

  return (
    <div className="flex h-screen bg-background text-foreground text-[13px]">
      <LeftNav
        selectedNavItem={selectedNavItem}
        toggleLeftSidebar={toggleLeftSidebar}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          showCommandDialog={setShowCommandDialog}
          setShowRightSidebar={setShowRightSidebar}
          showRightSidebar={showRightSidebar}
        />

        <div className="flex-1 flex overflow-hidden relative">
          <ResizablePanelGroup direction="horizontal">
            {leftSidebarContent && (
              <>
                <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
                  <LeftSidebar
                    content={leftSidebarContent}
                    setContent={setLeftSidebarContent}
                    tables={tables}
                    newTableName={newTableName}
                    setNewTableName={setNewTableName}
                    addTable={addTable}
                  />
                </ResizablePanel>
                <ResizableHandle withHandle>
                  <div className="w-1.5 h-full bg-border flex items-center justify-center">
                    <GripVertical size={12} className="text-muted-foreground" />
                  </div>
                </ResizableHandle>
              </>
            )}

            <ResizablePanel defaultSize={leftSidebarContent ? 80 : 100}>
              <div className="flex flex-col h-full border-r">
                {showQueryConsole ? (
                  <QueryConsole />
                ) : (
                  <>
                    <MainTop />
                    <MainBody />
                  </>
                )}

                <Footer
                  toggleBottomPanel={toggleBottomPanel}
                  toggleQueryConsole={toggleQueryConsole}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>

          {showRightSidebar && <RightSidebar />}

          <MainBottom
            showBottomPanel={showBottomPanel}
            bottomPanelTab={bottomPanelTab}
            setBottomPanelTab={setBottomPanelTab}
            setShowBottomPanel={setShowBottomPanel}
            selectedQuery={selectedQuery}
            setSelectedQuery={setSelectedQuery}
          />
        </div>
      </div>

      <CommandDialog open={showCommandDialog} onOpenChange={setShowCommandDialog}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Open Query Console</CommandItem>
            <CommandItem>Show Query History</CommandItem>
            <CommandItem>Connect to Database</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}