"use client"

import { useCallback } from "react"
import { ChevronLeft, Plus, ChevronRight, MoreVertical, Edit, Trash2, Copy, AlertCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useGraphBookStore } from "@/store/graphBookStore"



export default function CanvasListSection() {
  const {
    canvases,
    activeCanvas,
    editingId,
    editingValue,
    deleteCanvasId,
    isSearchOpen,
    setActiveCanvas,
    setEditingId,
    setEditingValue,
    setDeleteCanvasId,
    setIsSearchOpen,
    addCanvas,
    updateCanvas,
    deleteCanvas,
    goToPreviousCanvas,
    goToNextCanvas,
  } = useGraphBookStore()

  const handleEditCanvas = useCallback((id: string) => {
    const canvas = canvases.find(canvas => canvas.id === id)
    if (canvas) {
      setEditingId(id)
      setEditingValue(canvas.name)
    }
  }, [canvases, setEditingId, setEditingValue])

  const handleUpdateCanvas = useCallback((id: string) => {
    if (editingValue.trim() !== "") {
      updateCanvas(id, editingValue)
    }
  }, [editingValue, updateCanvas])

  const handleDuplicateCanvas = useCallback((id: string) => {
    const canvasToDuplicate = canvases.find(canvas => canvas.id === id)
    if (canvasToDuplicate) {
      const baseCanvasName = canvasToDuplicate.name.replace(/ \(Copy( \d+)?$$/, '')
      const copyCanvass = canvases.filter(canvas => canvas.name.startsWith(`${baseCanvasName} (Copy`))
      const copyNumber = copyCanvass.length + 1
      const newCanvasName = copyNumber === 1 ? `${baseCanvasName} (Copy)` : `${baseCanvasName} (Copy ${copyNumber})`
      
      const newId = (Math.max(...canvases.map(canvas => parseInt(canvas.id)), 0) + 1).toString()
      const newCanvas = { id: newId, name: newCanvasName }
      useGraphBookStore.getState().setCanvass([newCanvas, ...canvases])
      setActiveCanvas(newCanvas)
    }
  }, [canvases, setActiveCanvas])

  const getCurrentCanvasIndex = useCallback(() => {
    return canvases.findIndex(canvas => canvas.id === activeCanvas.id)
  }, [canvases, activeCanvas])

  return (
    <TooltipProvider>
      <div className="h-[30px] border-t border-b border-r flex items-center justify-between ">
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
        <ScrollArea className="flex-1">
          <div className="flex">
            {canvases.map((canvas) => (
              <div
                key={canvas.id}
                className={`flex items-center relative 
                  ${
                  canvas.id === activeCanvas.id ? '' : ''
                  // canvas.id === activeCanvas.id ? 'w-[160px]' : 'w-[100px]'
                }
                  `}
              >
                {editingId === canvas.id ? (
                  <Input
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onBlur={() => handleUpdateCanvas(canvas.id)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateCanvas(canvas.id)}
                    className="h-[30px] w-full px-2 rounded-none "
                    autoFocus
                  />
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-[30px] w-full px-2 rounded-none flex-shrink-0 ${
                      canvas.id === activeCanvas.id
                        ? 'text-blue-500 border-t-2 border-blue-500 bg-neutral-100 dark:bg-neutral-900'
                        : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                    }`}
                    onClick={() => setActiveCanvas(canvas)}
                  >
                    <span className="truncate text-xs pr-5">{canvas.name}</span>
                  </Button>
                )}
                {canvas.id === activeCanvas.id && (
                  <div className="absolute right-0 top-0 bottom-0 flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-[30px] w-[30px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleEditCanvas(canvas.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleDuplicateCanvas(canvas.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setDeleteCanvasId(canvas.id)}
                          disabled={canvases.length === 1}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center flex-shrink-0">
             
        <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-[30px] w-[30px]">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">Show all canvases</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0">
              <Command>
                <CommandInput placeholder="Search canvases..." />
                <CommandList>
                  <CommandEmpty>No canvases found.</CommandEmpty>
                  <CommandGroup>
                    {canvases.map((canvas) => (
                      <CommandItem
                        key={canvas.id}
                        className="cursor-pointer "
                        onSelect={() => {
                          setActiveCanvas(canvas.id)
                          setIsSearchOpen(false)
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
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
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <AlertDialog open={deleteCanvasId !== null} onOpenChange={() => setDeleteCanvasId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Are you sure you want to delete canvas - {canvases.find(canvas => canvas.id === deleteCanvasId)?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the canvas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteCanvasId && deleteCanvas(deleteCanvasId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}