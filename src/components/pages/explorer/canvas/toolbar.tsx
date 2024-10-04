"use client"

import { useState } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { GlobeIcon, Search, Binoculars, Camera, Eraser, Share2, Monitor } from "lucide-react"
import { ToolBarButton } from "@/components/structures/toolbar-button"
import { useAppStore } from "@/store/appStore"

export default function CanvasToolBar() {

  const [activeView, setActiveView] = useState("network")
  const {leftSidebar, setLeftSidebar} = useAppStore()

  const toggleQueryConsole = () => {
    if (leftSidebar === "query-console"){
      setLeftSidebar(null)
    }else{
      setLeftSidebar("query-console")
    }
  }

  return (
    <div className="flex flex-col">
      {/* h-[30px] */}
      <div className="flex items-center justify-between space-x-2 bg-background ">
        <TooltipProvider>

          <div className="flex items-center space-x-2 h-full">
            <div className="flex space-x-1 h-full">
              <ToolBarButton icon={<Search className="h-4 w-4 stroke-2" />} tooltip="Start a query"
               onClick={toggleQueryConsole} />
            </div>
            <div className="w-px h-4 bg-border mx-2" />
            <div className="flex space-x-1 h-full">
              <ToolBarButton icon={<Binoculars className="h-4 w-4 stroke-2" />} tooltip="Find in canvas" onClick={() => { }} />
              <ToolBarButton icon={<Camera className="h-4 w-4 stroke-2" />} tooltip="Save as Image" onClick={() => { }} />
              <ToolBarButton icon={<Monitor className="h-4 w-4 stroke-2" />} tooltip="Display settings" onClick={() => { }} />
            </div>
            <div className="w-px h-4 bg-border mx-2" />
            <div className="flex space-x-1 h-full">
              <ToolBarButton icon={<Eraser className="h-4 w-4 stroke-2" />} tooltip="Clear" onClick={() => { }} />
            </div>

            <div className="w-px h-4 bg-border mx-2" />
            <ToggleGroup type="single" value={activeView} onValueChange={setActiveView} className="h-full">
              <ToggleGroupItem value="network" aria-label="Network View" className="h-full px-2 data-[state=on]:bg-accent flex items-center space-x-1">
                <ToolBarButton icon={<Share2 className="h-4 w-4 stroke-2" />} tooltip="Network" onClick={() => { }} />
              </ToggleGroupItem>
              <ToggleGroupItem value="geo" aria-label="Geo View" className="h-full px-2 data-[state=on]:bg-accent flex items-center space-x-1">
                {/* <GlobeIcon className="h-4 w-4 stroke-2" /> */}
                <ToolBarButton icon={<GlobeIcon className="h-4 w-4 stroke-2" />} tooltip="Geo" onClick={() => { }} />
                {/* <span className="text-xs text-inherit">Geo</span> */}
              </ToggleGroupItem>
            </ToggleGroup>
            {/* {activeView === "network" && (
              <>
                <div className="w-px h-4 bg-border mx-2" />
                <div className="flex space-x-1 h-full">
                  <ToolBarButton
                    icon={<GridIcon className="h-4 w-4 stroke-2" />}
                    tooltip="Orthogonal Layout"
                    onClick={() => setNetworkLayout("orthogonal")}
                    isActive={networkLayout === "orthogonal"}
                  />
                  <ToolBarButton
                    icon={<ShareIcon className="h-4 w-4 stroke-2" />}
                    tooltip="Force Directed Layout"
                    onClick={() => setNetworkLayout("force-directed")}
                    isActive={networkLayout === "force-directed"}
                  />
                  <ToolBarButton
                    icon={<CircleIcon className="h-4 w-4 stroke-2" />}
                    tooltip="Radial Layout"
                    onClick={() => setNetworkLayout("radial")}
                    isActive={networkLayout === "radial"}
                  />
                  <ToolBarButton
                    icon={<GitCommitIcon className="h-4 w-4 stroke-2" />}
                    tooltip="Circular Layout"
                    onClick={() => setNetworkLayout("circular")}
                    isActive={networkLayout === "circular"}
                  />
                  <ToolBarButton
                    icon={<GitBranchIcon className="h-4 w-4 stroke-2" />}
                    tooltip="Hierarchical Layout"
                    onClick={() => setNetworkLayout("hierarchical")}
                    isActive={networkLayout === "hierarchical"}
                  />
                </div>
              </>
            )} */}


          </div>

        </TooltipProvider>
      </div>

    </div>
  )
}