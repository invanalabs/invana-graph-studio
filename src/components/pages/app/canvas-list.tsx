"use client"

import { useCallback, useState, useRef, useEffect, KeyboardEvent, MouseEvent, ChangeEvent } from "react"
import { ChevronLeft, Plus, ChevronRight, MoreVertical, Edit, Trash2, Copy, Monitor, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useGraphBookStore } from "@/store/graphBookStore"

export default function CanvasListSection() {
  const {
    canvases,
    activeCanvas,
    deleteCanvasId,
    isSearchOpen,
    setActiveCanvas,
    setDeleteCanvasId,
    setIsSearchOpen,
    addCanvas,
    updateCanvas,
    deleteCanvas,
    goToPreviousCanvas,
    goToNextCanvas,
  } = useGraphBookStore()

  const [editingCanvas, setEditingCanvas] = useState<{ id: string; name: string } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const canvasRefs = useRef<{ [id: string]: HTMLDivElement | null }>({})
  const editInputRef = useRef<HTMLInputElement>(null)

  const handleEditCanvas = useCallback((id: string) => {
    const canvas = canvases.find(canvas => canvas.id === id)
    if (canvas) {
      setEditingCanvas({ id, name: canvas.name })
    }
  }, [canvases])

  const handleUpdateCanvas = useCallback(() => {
    if (editingCanvas && editingCanvas.name.trim() !== "") {
      updateCanvas(editingCanvas.id, editingCanvas.name)
      setEditingCanvas(null)
    }
  }, [editingCanvas, updateCanvas])

  const handleDuplicateCanvas = useCallback((id: string) => {
    const canvasToDuplicate = canvases.find(canvas => canvas.id === id)
    if (canvasToDuplicate) {
      const baseCanvasName = canvasToDuplicate.name.replace(/ \(Copy( \d+)?$/, '')
      const copyCanvases = canvases.filter(canvas => canvas.name.startsWith(`${baseCanvasName} (Copy`))
      const copyNumber = copyCanvases.length + 1
      const newCanvasName = copyNumber === 1 ? `${baseCanvasName} (Copy)` : `${baseCanvasName} (Copy ${copyNumber})`

      const newId = (Math.max(...canvases.map(canvas => parseInt(canvas.id)), 0) + 1).toString()
      const newCanvas = { id: newId, name: newCanvasName }
      useGraphBookStore.getState().setCanvases([newCanvas, ...canvases])
      setActiveCanvas(newCanvas)
    }
  }, [canvases, setActiveCanvas])

  const getCurrentCanvasIndex = useCallback(() => {
    return canvases.findIndex(canvas => canvas.id === activeCanvas.id)
  }, [canvases, activeCanvas])

  const scrollToActiveCanvas = useCallback(() => {
    if (activeCanvas && canvasRefs.current[activeCanvas.id]) {
      canvasRefs.current[activeCanvas.id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [activeCanvas])

  useEffect(() => {
    scrollToActiveCanvas()
  }, [activeCanvas, scrollToActiveCanvas])

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleUpdateCanvas()
    }
  }

  const handleDeleteKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleDeleteCanvas()
    }
  }

  const handleDeleteCanvas = useCallback(() => {
    if (deleteCanvasId) {
      const currentIndex = canvases.findIndex(canvas => canvas.id === deleteCanvasId)
      deleteCanvas(deleteCanvasId)

      // Select the next canvas, or the previous one if deleting the last canvas
      if (currentIndex < canvases.length - 1) {
        setActiveCanvas(canvases[currentIndex + 1])
      } else if (currentIndex > 0) {
        setActiveCanvas(canvases[currentIndex - 1])
      }

      setDeleteCanvasId(null)
    }
  }, [deleteCanvasId, canvases, setActiveCanvas])

  const handleContextMenu = (e: MouseEvent, canvasId: string) => {
    e.preventDefault()
    setActiveCanvas(canvases.find(canvas => canvas.id === canvasId)!)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredCanvases = canvases.filter(canvas => 
    canvas.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <TooltipProvider>
      <div className="h-[30px] border-t border-b border-r flex items-center justify-between">
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPreviousCanvas}
                disabled={getCurrentCanvasIndex() === 0}
                className="h-[30px] w-[30px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:text-gray-300"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous Canvas</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous Canvas</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={addCanvas}
                className="h-[30px] w-[30px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add Canvas</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Canvas</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextCanvas}
                disabled={getCurrentCanvasIndex() === canvases.length - 1}
                className="h-[30px] w-[30px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:text-gray-300"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next Canvas</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next Canvas</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="flex">
            {canvases.map((canvas) => (
              <ContextMenu key={canvas.id}>
                <ContextMenuTrigger asChild>
                  <div
                    ref={el => canvasRefs.current[canvas.id] = el}
                    className={`flex items-center relative ${canvas.id === activeCanvas.id ? '' : ''}`}
                    onContextMenu={(e) => handleContextMenu(e, canvas.id)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-[30px w-full] px-2 rounded-none flex-shrink-0 ${
                        canvas.id === activeCanvas.id
                          ? 'text-blue-500 border-t-2 border-l border-blue-500 bg-neutral-100 dark:bg-neutral-900'
                          : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                      }`}
                      onClick={() => setActiveCanvas(canvas)}
                      onDoubleClick={() => handleEditCanvas(canvas.id)}
                    >
                      <span className="truncate text-xs">{canvas.name}</span>
                    </Button>
                    {canvas.id === activeCanvas.id && (
                      <div className=" right-0 top-0 bottom-0 flex items-center bg-neutral-100 dark:bg-neutral-900">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-[30px] w-[30px] text-gray-400 rounded-none hover:text-gray-600 dark:hover:text-gray-200"
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Canvas options</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 !p-0 m-0" align="end">
                            <Button
                              variant="ghost"
                              size={"sm"}
                              className="w-full !justify-start rounded-none"
                              onClick={() => handleEditCanvas(canvas.id)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size={"sm"}
                              className="w-full !justify-start rounded-none"
                              onClick={() => handleDuplicateCanvas(canvas.id)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </Button>
                            <Button
                              variant="ghost"
                              size={"sm"}
                              className="w-full !justify-start rounded-none"
                              onClick={() => setDeleteCanvasId(canvas.id)}
                              disabled={canvases.length === 1}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onSelect={() => handleEditCanvas(canvas.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </ContextMenuItem>
                  <ContextMenuItem onSelect={() => handleDuplicateCanvas(canvas.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Duplicate</span>
                  </ContextMenuItem>
                  <ContextMenuItem
                    onSelect={() => setDeleteCanvasId(canvas.id)}
                    disabled={canvases.length === 1}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center flex-shrink-0">
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-[30px] w-[30px]">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Search canvases</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0">
              <div className="p-2 space-y-2 text-sm">
                <Input
                  placeholder="Search canvases..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full"
                />
                <ScrollArea className="h-[200px]">
                  {filteredCanvases.map((canvas) => (
                    <div
                      key={canvas.id}
                      className="flex items-center justify-between p-1 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        setActiveCanvas(canvas)
                        setIsSearchOpen(false)
                      }}
                    >
                      <span>{canvas.name}</span>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0 mr-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDuplicateCanvas(canvas.id)
                          }}
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Duplicate canvas</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            setDeleteCanvasId(canvas.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete canvas</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              
              </div>
            </PopoverContent>
          </Popover>
          <span className="flex">
            <Button>
              <Monitor className="w-4" />
            </Button>
          </span>
        </div>
      </div>
      <AlertDialog open={deleteCanvasId !== null} onOpenChange={() => setDeleteCanvasId(null)}>
        <AlertDialogContent onKeyDown={handleDeleteKeyDown}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete canvas - {canvases.find(canvas => canvas.id === deleteCanvasId)?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the canvas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction autoFocus onClick={handleDeleteCanvas}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={editingCanvas !== null} onOpenChange={(open) => !open && setEditingCanvas(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Canvas Name</DialogTitle>
          </DialogHeader>
          <Input
            ref={editInputRef}
            value={editingCanvas?.name || ''}
            onChange={(e) => setEditingCanvas(prev => prev ? { ...prev, name: e.target.value } : null)}
            onKeyDown={handleEditKeyDown}
            className="mt-4"
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCanvas(null)}>Cancel</Button>
            <Button onClick={handleUpdateCanvas}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}