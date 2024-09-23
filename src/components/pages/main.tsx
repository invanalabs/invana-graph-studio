'use client'

import { useState } from 'react'
import { FilePlus, Trash2, Square, Circle, Triangle, Link, Terminal, PanelRightOpen, Maximize2, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

interface MainContentProps {
  pages: string[];
  activePage: number;
  setActivePage: (index: number) => void;
  addPage: () => void;
}

export function MainContent({ 
  pages = ['Dashboard'], 
  activePage = 0, 
  setActivePage = () => {}, 
  addPage = () => {}
}: MainContentProps) {
  const [isQueryConsoleOpen, setIsQueryConsoleOpen] = useState(false)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false)
  const [query, setQuery] = useState('')

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Query submitted:', query)
    // Handle query submission logic here
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const goToPreviousPage = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1)
    }
  }

  const goToNextPage = () => {
    if (activePage < (pages.length - 1)) {
      setActivePage(activePage + 1)
    }
  }

  const currentPage = pages[activePage] || 'Unknown Page'

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
    {/* Top: Toolbar */}
    <div className="h-10 border-b  flex items-center px-2 space-x-2 ">    
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-100" onClick={() => setIsQueryConsoleOpen(!isQueryConsoleOpen)}>
                <Terminal className="h-4 w-4" />
                <span className="sr-only">Toggle Query Console</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Query Console</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-100">
                <FilePlus className="h-4 w-4" />
                <span className="sr-only">New File</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>New File</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-100">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Clear Canvas</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear Canvas</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-100">
                <Square className="h-4 w-4" />
                <span className="sr-only">Add Square</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Square</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-100">
                <Circle className="h-4 w-4" />
                <span className="sr-only">Add Circle</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Circle</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-100">
                <Triangle className="h-4 w-4" />
                <span className="sr-only">Add Triangle</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Triangle</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-100">
                <Link className="h-4 w-4" />
                <span className="sr-only">Add Link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex-1" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-100" onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}>
                <PanelRightOpen className="h-4 w-4" />
                <span className="sr-only">Toggle Right Panel</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Right Panel</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-100" onClick={toggleFullScreen}>
                <Maximize2 className="h-4 w-4" />
                <span className="sr-only">Toggle Fullscreen</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Fullscreen</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Body: Main content area */}
      <div className="flex-1 overflow-hidden flex relative">
        {isQueryConsoleOpen && (
          <div className="left-0 top-0 bottom-0 w-80  border-r  p-4 flex flex-col overflow-auto z-10">
            <h3 className="text-lg font-semibold mb-2 text-gray-100">Query Console</h3>
            <form onSubmit={handleQuerySubmit} className="flex-1 flex flex-col">
              <div className="flex-1">
                <Input
                  as="textarea"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your query here..."
                  className="w-full h-full resize-none focus:border-gray-500"
                />
              </div>
              <Button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-700  ">Submit Query</Button>
            </form>
          </div>
        )}
        <main className="flex-1 overflow-auto ">
          <div className="h-full w-full p-6">
            <h2 className="text-xl font-semibold mb-4  ">{currentPage}</h2>
            <p className=" ">This is the content for {currentPage}. You can add your specific dashboard components or information here.</p>
          </div>
        </main>
        {isRightPanelOpen && (
          <div className="w-80 border-l  p-4 overflow-auto ">
            <h3 className="text-lg font-semibold mb-2 text-gray-100">Right Panel</h3>
            <p className="text-gray-400">This is the right side panel. You can add additional information or controls here.</p>
          </div>
        )}
      </div>

      {/* Bottom: Pages list section */}
      <div className="h-[30px] border-t  flex items-center justify-between ">
        <div className="flex-1 flex overflow-x-auto">
          {pages.map((page, index) => (
            <Button
              key={page}
              variant="ghost"
              size="sm"
              className={`h-[30px] px-4 rounded-none flex-shrink-0 ${
                index === activePage
                  ? 'text-blue-400 border-t-2 '
                  : 'text-gray-400 hover:text-gray-100'
              }`}
              onClick={() => setActivePage(index)}
            >
              {page}
            </Button>
          ))}
        </div>
        <div className="flex items-center flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={goToPreviousPage} disabled={activePage === 0} className="h-10 w-10 p-0 text-gray-400 hover:text-gray-100 disabled:text-gray-600">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={addPage} className="h-10 w-10 p-0 text-gray-400 hover:text-gray-100">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add Page</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={goToNextPage} disabled={activePage === (pages.length - 1)} className="h-10 w-10 p-0 text-gray-400 hover:text-gray-100 disabled:text-gray-600">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}