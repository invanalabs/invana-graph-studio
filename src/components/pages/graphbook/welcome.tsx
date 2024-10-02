"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Component() {
  const [open, setOpen] = useState(false)

  const handleWorkbookClick = (workbookName: string) => {
    console.log(`Opening workbook: ${workbookName}`)
    // Add your logic here to open the workbook
  }

  const handleSectionClick = (sectionName: string, count: number) => {
    console.log(`Clicked on ${sectionName}: ${count}`)
    // Add your logic here to handle section clicks
  }

  const handleCreateNewWorkbook = () => {
    console.log("Creating new workbook")
    // Add your logic here to create a new workbook
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Welcome Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-6">Welcome to Invana Studio v0.1.0</DialogTitle>
        </DialogHeader>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Graphbooks", count: 12 },
                { name: "Functions", count: 2 },
                { name: "Reports", count: 5 },
              ].map((item) => (
                <div
                  key={item.name}
                  className="p-4 rounded-lg bg-card hover:bg-accent cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center text-center"
                  onClick={() => handleSectionClick(item.name, item.count)}
                >
                  <h2 className="text-3xl font-bold">{item.count}</h2>
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources to Get Started</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-primary hover:underline">Get started with Invana Studio</a></li>
                <li><a href="#" className="text-primary hover:underline">Modeling graphs with Invana</a></li>
                <li><a href="#" className="text-primary hover:underline">Introduction to Apache Tinkerpop's Gremlin</a></li>
                <li><a href="#" className="text-primary hover:underline">Help & Support</a></li>
              </ul>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Workbooks</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
                onClick={handleCreateNewWorkbook}
              >
                New Workbook
              </Button>
            </div>
            <div className="border-l-2 border-primary/20 pl-4">
              <ScrollArea className="h-[250px] w-full pr-4">
                <div className="space-y-4">
                  {[
                    "Getting started with Invana Studio v0.1.0",
                    "Finalise analysis workbook",
                    "Data exploration project",
                    "Network analysis report",
                    "Customer segmentation study",
                    "Graph database optimization",
                    "Social network analysis"
                  ].map((workbook, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-md hover:bg-accent cursor-pointer transition-colors duration-200"
                      onClick={() => handleWorkbookClick(workbook)}
                    >
                      <h4 className="font-medium">{workbook}</h4>
                      <p className="text-sm text-muted-foreground">
                        {index === 0 ? "12 minutes ago" : `${(index + 1) * 15} minutes ago`}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}