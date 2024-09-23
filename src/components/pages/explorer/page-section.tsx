"use client"

import { usePagesStore } from "@/store/pagesStore"


export default function PageSection() {

    const { pages, activePage, setActivePage, addPage } = usePagesStore()


    return (
        <div className="flex-1 overflow-hidden flex relative">
            <h1>Page {activePage}</h1>
        </div>
    )
}