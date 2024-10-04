"use client"

import { useGraphBookStore } from "@/store/graphBookStore"


export default function PageSection() {

    const { pages, activePage, setActivePage, addPage } = useGraphBookStore()

    console.log("==activePage", activePage)
    return (
        <div className="flex-1 overflow-hidden flex relative bg-neutral-950">
            <h1>Page {activePage.id}</h1>
        </div>
    )
}