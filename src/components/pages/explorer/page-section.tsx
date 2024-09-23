"use client"

import { usePagesStore } from "@/store/pagesStore"


export default function PageSection() {

    const { pages, currentPageIndex, setCurrentPageIndex, addPage } = usePagesStore()


    return (
        <div className="flex-1 overflow-hidden flex relative">
            <h1>Page {currentPageIndex}</h1>
        </div>
    )
}