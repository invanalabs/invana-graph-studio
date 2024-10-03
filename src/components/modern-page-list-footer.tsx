import { useState, useCallback, useEffect } from "react"
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

interface Page {
  id: string
  pageName: string
}

export function ModernPageListSectionComponent() {
  const [pages, setPages] = useState<Page[]>([{ id: "1", pageName: "Page 1" }])
  const [currentPageId, setCurrentPageId] = useState<string>("1")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState("")
  const [deletePageId, setDeletePageId] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    if (pages.length === 0) {
      const newPage = { id: "1", pageName: "Page 1" }
      setPages([newPage])
      setCurrentPageId("1")
    }
  }, [pages])

  const getCurrentPageIndex = useCallback(() => {
    return pages.findIndex(page => page.id === currentPageId)
  }, [pages, currentPageId])

  const goToPreviousPage = useCallback(() => {
    const currentIndex = getCurrentPageIndex()
    if (currentIndex > 0) {
      setCurrentPageId(pages[currentIndex - 1].id)
    }
  }, [getCurrentPageIndex, pages])

  const goToNextPage = useCallback(() => {
    const currentIndex = getCurrentPageIndex()
    if (currentIndex < pages.length - 1) {
      setCurrentPageId(pages[currentIndex + 1].id)
    }
  }, [getCurrentPageIndex, pages])

  const handleAddPage = useCallback(() => {
    const newId = (Math.max(...pages.map(page => parseInt(page.id)), 0) + 1).toString()
    const newPage = { id: newId, pageName: `Page ${newId}` }
    setPages(prevPages => [newPage, ...prevPages])
    setCurrentPageId(newId)
  }, [pages])

  const handleEditPage = useCallback((id: string) => {
    setEditingId(id)
    setEditingValue(pages.find(page => page.id === id)?.pageName || "")
  }, [pages])

  const handleUpdatePage = useCallback((id: string) => {
    if (editingValue.trim() !== "") {
      setPages(prevPages => prevPages.map(page => 
        page.id === id ? { ...page, pageName: editingValue.trim() } : page
      ))
      setEditingId(null)
    }
  }, [editingValue])

  const handleDeletePage = useCallback((id: string) => {
    setPages(prevPages => {
      const pageIndex = prevPages.findIndex(page => page.id === id)
      const newPages = prevPages.filter(page => page.id !== id)
      
      if (newPages.length === 0) {
        const defaultPage = { id: "1", pageName: "Page 1" }
        setCurrentPageId("1")
        return [defaultPage]
      }

      if (id === currentPageId) {
        if (pageIndex > 0) {
          setCurrentPageId(newPages[pageIndex - 1].id)
        } else {
          setCurrentPageId(newPages[0].id)
        }
      }
      
      return newPages
    })
    setDeletePageId(null)
  }, [currentPageId])

  const handleDuplicatePage = useCallback((id: string) => {
    const pageToDuplicate = pages.find(page => page.id === id)
    if (pageToDuplicate) {
      const basePageName = pageToDuplicate.pageName.replace(/ \(Copy( \d+)?$$$/, '')
      const copyPages = pages.filter(page => page.pageName.startsWith(`${basePageName} (Copy`))
      const copyNumber = copyPages.length + 1
      const newPageName = copyNumber === 1 ? `${basePageName} (Copy)` : `${basePageName} (Copy ${copyNumber})`
      
      const newId = (Math.max(...pages.map(page => parseInt(page.id)), 0) + 1).toString()
      const newPage = { id: newId, pageName: newPageName }
      setPages(prevPages => [newPage, ...prevPages])
      setCurrentPageId(newId)
    }
  }, [pages])

  return (
    <TooltipProvider>
      <div className="h-[40px] border-t flex items-center justify-between bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center">
          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-[40px] w-[40px]">
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
                    className="h-[40px] w-full px-2 rounded-none"
                    autoFocus
                  />
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-[40px] w-full px-2 rounded-none flex-shrink-0 transition-colors duration-200 ${
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
                          className="h-[40px] w-[30px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
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
                className="h-[40px] w-[40px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:text-gray-300"
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
                onClick={handleAddPage}
                className="h-[40px] w-[40px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
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
                className="h-[40px] w-[40px] p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:text-gray-300"
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
            <AlertDialogAction onClick={() => deletePageId && handleDeletePage(deletePageId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}