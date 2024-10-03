"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { FileIcon, Trash2Icon, RefreshCwIcon, ZoomInIcon, ZoomOutIcon, MaximizeIcon, TableIcon, NetworkIcon, GlobeIcon, PanelRightOpenIcon, PanelRightCloseIcon, ExpandIcon, SettingsIcon, GridIcon, ShareIcon, CircleIcon, GitCommitIcon, GitBranchIcon, FilterIcon, DamIcon, SearchCode, Search, SwitchCamera, MoveLeft, MoveRight, RotateCcw } from "lucide-react"
import { DatabaseSync } from "node:sqlite"
import { ToolBarButton } from "@/components/structures/toolbar-button"

export default function CanvasToolBar() {
  const [activeView, setActiveView] = useState("table")
  const [nodeSize, setNodeSize] = useState(10)
  const [showLabels, setShowLabels] = useState(true)
  const [networkLayout, setNetworkLayout] = useState("force-directed")
  const [rightPanel, setRightPanel] = useState<"none" | "settings" | "content">("none")



  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between space-x-2 bg-background border-b h-[30px]">
        <TooltipProvider>
        <div className="flex items-center space-x-2 h-full">
          <div className="flex space-x-1 h-full">
            {/* <ToolBarButton icon={<Search className="h-4 w-4 stroke-2" />} tooltip="Filter" onClick={() => { }} />
            <ToolBarButton icon={<DamIcon className="h-4 w-4 stroke-2" />} tooltip="Sort" onClick={() => { }} />
            <ToolBarButton icon={<DamIcon className="h-4 w-4 stroke-2" />} tooltip="Columns" onClick={() => { }} /> */}


            <ToggleGroup type="single" value={activeView} onValueChange={setActiveView} className="h-full">
            <ToggleGroupItem value="table" aria-label="Table View" className="h-full data-[state=on]:bg-accent flex rounded-none items-center space-x-1">
              <ToolBarButton icon={<Search className="h-4 w-4 stroke-2 mr-2" />} tooltip="Query Console" label={"Query"}  onClick={() => { }} />
            </ToggleGroupItem>
            <ToggleGroupItem value="network" aria-label="Network View" className="h-full data-[state=on]:bg-accent flex rounded-none items-center space-x-1">
              <ToolBarButton icon={<SwitchCamera className="h-4 w-4 stroke-2 mr-2" />} tooltip="Schema" label={"Schema"} onClick={() => { }} />
            </ToggleGroupItem>
          </ToggleGroup>


          </div>
        </div>
        <div className="flex items-center space-x-2 h-full">
          <div className="flex space-x-1 h-full">
            <ToolBarButton icon={<FileIcon className="h-4 w-4 stroke-2" />} tooltip="New Page" onClick={() => { }} />
            <ToolBarButton icon={<Trash2Icon className="h-4 w-4 stroke-2" />} tooltip="Clear" onClick={() => { }} />
            <ToolBarButton icon={<RefreshCwIcon className="h-4 w-4 stroke-2" />} tooltip="Redraw" onClick={() => { }} />
          </div>
          <div className="w-px h-4 bg-border mx-2" />

          <div className="flex space-x-1 h-full">
            <ToolBarButton icon={<MoveLeft className="h-4 w-4 stroke-2" />} tooltip="New Page" onClick={() => { }} />
            <ToolBarButton icon={<RotateCcw className="h-4 w-4 stroke-2" />} tooltip="Clear" onClick={() => { }} />
            <ToolBarButton icon={<MoveRight className="h-4 w-4 stroke-2" />} tooltip="Redraw" onClick={() => { }} />
          </div>
          <div className="w-px h-4 bg-border mx-2" />
          <div className="flex space-x-1 h-full">
            <ToolBarButton icon={<ZoomInIcon className="h-4 w-4 stroke-2" />} tooltip="Zoom In" onClick={() => { }} />
            <ToolBarButton icon={<ZoomOutIcon className="h-4 w-4 stroke-2" />} tooltip="Zoom Out" onClick={() => { }} />
            <ToolBarButton icon={<MaximizeIcon className="h-4 w-4 stroke-2" />} tooltip="Fit" onClick={() => { }} />
          </div>
          <div className="w-px h-4 bg-border mx-2" />
          <ToggleGroup type="single" value={activeView} onValueChange={setActiveView} className="h-full">
            <ToggleGroupItem value="table" aria-label="Table View" className="h-full px-2 data-[state=on]:bg-accent flex items-center space-x-1">
              {/* <TableIcon className="h-4 w-4 stroke-2" />
              <span className="text-xs">Table</span> */}
              <ToolBarButton icon={<TableIcon className="h-4 w-4 stroke-2" />} tooltip="Table" onClick={() => { }} />

            </ToggleGroupItem>
            <ToggleGroupItem value="network" aria-label="Network View" className="h-full px-2 data-[state=on]:bg-accent flex items-center space-x-1">
             
              <ToolBarButton icon={<NetworkIcon className="h-4 w-4 stroke-2" />} tooltip="Network" onClick={() => { }} />

            </ToggleGroupItem>
            <ToggleGroupItem value="geo" aria-label="Geo View" className="h-full px-2 data-[state=on]:bg-accent flex items-center space-x-1">
              {/* <GlobeIcon className="h-4 w-4 stroke-2" />
              <span className="text-xs">Geo</span> */}
              <ToolBarButton icon={<GlobeIcon className="h-4 w-4 stroke-2" />} tooltip="Geo" onClick={() => { }} />

            </ToggleGroupItem>
          </ToggleGroup>
          {activeView === "network" && (
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
          )}
        </div>
        <div className="flex space-x-1 h-full">

          <ToolBarButton
            icon={<SettingsIcon className="h-4 w-4 stroke-2" />}
            tooltip="Display Settings"
            onClick={() => setRightPanel(rightPanel === "settings" ? "none" : "settings")}
            isActive={rightPanel === "settings"}
          />
          <ToolBarButton
            icon={rightPanel === "content" ? <PanelRightCloseIcon className="h-4 w-4 stroke-2" /> : <PanelRightOpenIcon className="h-4 w-4 stroke-2" />}
            tooltip={rightPanel === "content" ? "Close right panel" : "Open right panel"}
            onClick={() => setRightPanel(rightPanel === "content" ? "none" : "content")}
            isActive={rightPanel === "content"}
          />
        </div>
        </TooltipProvider>
      </div>
      <div className="flex flex-1 bg-background">
        {/* Main content area */}
        <div className="flex-1"></div>
        {rightPanel !== "none" && (
          <Card className="w-[460px] h-[calc(100vh-30px-40px)] absolute rounded-none rounded-none shadow-none">
            <CardHeader className="bg-muted">
              <CardTitle>{rightPanel === "settings" ? "Display Settings" : "Right Panel Content"}</CardTitle>
            </CardHeader>
            <CardContent>
              {rightPanel === "settings" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="node-size">Node Size</Label>
                    <Slider
                      id="node-size"
                      min={5}
                      max={20}
                      step={1}
                      value={[nodeSize]}
                      onValueChange={(value) => setNodeSize(value[0])}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-labels"
                      checked={showLabels}
                      onCheckedChange={setShowLabels}
                    />
                    <Label htmlFor="show-labels">Show Labels</Label>
                  </div>
                </div>
              ) : (
                <p>This is the content of the right panel. You can add any components or information here.</p>
              )}
            </CardContent>
          </Card>
        )}


      </div>
    </div>
  )
}