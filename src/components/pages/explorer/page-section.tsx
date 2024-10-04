"use client"

import { usePagesStore } from "@/store/pagesStore"


export default function PageSection() {

    const { pages, activePage, setActivePage, addPage } = usePagesStore()

    console.log("==activePage", activePage)
    return (
        <div className="flex-1 overflow-hidden flex relative bg-neutral-100 dark:bg-neutral-900 ">
            <h1>Page {activePage.id}</h1>
        </div>
    )
}