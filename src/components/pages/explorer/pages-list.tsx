"use client"

import { useCallback } from "react"
import { ChevronLeft, Plus, ChevronRight, MoreVertical, Edit, Trash2, Copy } from "lucide-react"
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
import { usePagesStore } from "@/store/pagesStore"


export default function PageListFooter() {
  const {
    pages,
    currentPageId,
    editingId,
    editingValue,
    deletePageId,
    isSearchOpen,
    setCurrentPageId,
    setEditingId,
    setEditingValue,
    setDeletePageId,
    setIsSearchOpen,
    addPage,
    updatePage,
    deletePage,
    goToPreviousPage,
    goToNextPage,
  } = usePagesStore()

  const handleEditPage = useCallback((id: string) => {
    const page = pages.find(page => page.id === id)
    if (page) {
      setEditingId(id)
      setEditingValue(page.pageName)
    }
  }, [pages, setEditingId, setEditingValue])

  const handleUpdatePage = useCallback((id: string) => {
    if (editingValue.trim() !== "") {
      updatePage(id, editingValue)
    }
  }, [editingValue, updatePage])

  const handleDuplicatePage = useCallback((id: string) => {
    const pageToDuplicate = pages.find(page => page.id === id)
    if (pageToDuplicate) {
      const basePageName = pageToDuplicate.pageName.replace(/ \(Copy( \d+)?$$/, '')
      const copyPages = pages.filter(page => page.pageName.startsWith(`${basePageName} (Copy`))
      const copyNumber = copyPages.length + 1
      const newPageName = copyNumber === 1 ? `${basePageName} (Copy)` : `${basePageName} (Copy ${copyNumber})`
      
      const newId = (Math.max(...pages.map(page => parseInt(page.id)), 0) + 1).toString()
      const newPage = { id: newId, pageName: newPageName }
      usePagesStore.getState().setPages([newPage, ...pages])
      setCurrentPageId(newId)
    }
  }, [pages, setCurrentPageId])

  const getCurrentPageIndex = useCallback(() => {
    return pages.findIndex(page => page.id === currentPageId)
  }, [pages, currentPageId])

  return (
    <TooltipProvider>
      <div className="h-[30px] border-t border-b border-r flex items-center justify-between ">
        <div className="flex items-center">
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-[30px] w-[30px]">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">Show all pages</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search pages..." />
                <CommandList>
                  <CommandEmpty>No pages found.</CommandEmpty>
                  <CommandGroup>
                    {pages.map((page) => (
                      <CommandItem
                        key={page.id}
                        onSelect={() => {
                          setCurrentPageId(page.id)
                          setIsSearchOpen(false)
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{page.pageName}</span>
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0 mr-1"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDuplicatePage(page.id)
                              }}
                            >
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Duplicate page</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                setDeletePageId(page.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete page</span>
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
        <ScrollArea className="flex-1">
          <div className="flex">
            {pages.map((page) => (
              <div
                key={page.id}
                className={`flex items-center relative ${
                  page.id === currentPageId ? 'w-[160px]' : 'w-[100px]'
                }`}
              >
                {editingId === page.id ? (
                  <Input
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onBlur={() => handleUpdatePage(page.id)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdatePage(page.id)}
                    className="h-[30px] w-full px-2 rounded-none"
                    autoFocus
                  />
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-[30px] w-full px-2 rounded-none flex-shrink-0 ${
                      page.id === currentPageId
                        ? 'text-blue-500 border-b-2 border-blue-500 bg-white dark:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                    }`}
                    onClick={() => setCurrentPageId(page.id)}
                  >
                    <span className="truncate text-sm">{page.pageName}</span>
                  </Button>
                )}
                {page.id === currentPageId && (
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
                        <DropdownMenuItem onSelect={() => handleEditPage(page.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleDuplicatePage(page.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setDeletePageId(page.id)}
                          disabled={pages.length === 1}
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPreviousPage}
                disabled={getCurrentPageIndex() === 0}
                className="h-[30px] w-[30px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:text-gray-300"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous Page</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous Page</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={addPage}
                className="h-[30px] w-[30px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add Page</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Page</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextPage}
                disabled={getCurrentPageIndex() === pages.length - 1}
                className="h-[30px] w-[30px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:text-gray-300"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next Page</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next Page</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <AlertDialog open={deletePageId !== null} onOpenChange={() => setDeletePageId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this page?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deletePageId && deletePage(deletePageId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}