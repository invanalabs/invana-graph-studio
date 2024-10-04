"use client"

import { useGraphBookStore } from "@/store/graphBookStore"


export default function PageSection() {

    const { activeCanvas, } = useGraphBookStore()

    console.log("==activeCanvas", activeCanvas)
    return (
        <div className="flex-1 overflow-hidden flex relative bg-neutral-100 dark:bg-neutral-900 ">
            <h1>Page {activeCanvas.id}</h1>
        </div>
    )
}