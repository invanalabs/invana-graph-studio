"use client"
import { ChevronLeft, Plus, ChevronRight, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePagesStore } from "@/store/pagesStore"

export default function PageListFooter() {

    const { pages, currentPageIndex, setCurrentPageIndex, addPage } = usePagesStore()

    const goToPreviousPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1)
        }
    }

    const goToNextPage = () => {
        if (currentPageIndex < (pages.length - 1)) {
            setCurrentPageIndex(currentPageIndex + 1)
        }
    }

    return (
        <div className="h-[30px] border-t  flex items-center justify-between ">
            <div className="flex-1 flex overflow-x-auto">
                {pages.map((page, index) => (
                    <Button
                        key={page}
                        variant="ghost"
                        size="sm"
                        className={`h-[30px] px-4 rounded-none flex-shrink-0 ${index === currentPageIndex
                            ? 'text-blue-400 border-t-2 '
                            : 'text-gray-400 hover:text-gray-100'
                            }`}
                        onClick={() => setCurrentPageIndex(index)}
                    >
                        {page}
                    </Button>
                ))}
            </div>
            <div className="flex items-center flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={goToPreviousPage} disabled={currentPageIndex === 0} className="h-10 w-10 p-0 text-gray-400 hover:text-gray-100 disabled:text-gray-600">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={addPage} className="h-10 w-10 p-0 text-gray-400 hover:text-gray-100">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Page</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={goToNextPage} disabled={currentPageIndex === (pages.length - 1)} className="h-10 w-10 p-0 text-gray-400 hover:text-gray-100 disabled:text-gray-600">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                </Button>
            </div>
        </div>
    )
}