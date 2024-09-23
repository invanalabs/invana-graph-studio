"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { FileIcon, Trash2Icon, RefreshCwIcon, ZoomInIcon, ZoomOutIcon, MaximizeIcon, TableIcon, NetworkIcon, GlobeIcon, PanelRightOpenIcon, PanelRightCloseIcon, ExpandIcon, SettingsIcon, GridIcon, ShareIcon, CircleIcon, GitCommitIcon, GitBranchIcon } from "lucide-react"

export default function ExplorerMainToolBar() {
  const [activeView, setActiveView] = useState("table")
  const [nodeSize, setNodeSize] = useState(10)
  const [showLabels, setShowLabels] = useState(true)
  const [networkLayout, setNetworkLayout] = useState("force-directed")
  const [rightPanel, setRightPanel] = useState<"none" | "settings" | "content">("none")

  const MenuButton = ({ icon, tooltip, onClick, isActive = false }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={isActive ? "secondary" : "ghost"} 
            size="sm" 
            onClick={onClick} 
            className="h-full px-2"
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between space-x-2 px-2 bg-background border-b h-[30px]">
        <div className="flex items-center space-x-2 h-full">
          <div className="flex space-x-1 h-full">
            <MenuButton icon={<FileIcon className="h-4 w-4 stroke-2" />} tooltip="New Page" onClick={() => {}} />
            <MenuButton icon={<Trash2Icon className="h-4 w-4 stroke-2" />} tooltip="Clear" onClick={() => {}} />
            <MenuButton icon={<RefreshCwIcon className="h-4 w-4 stroke-2" />} tooltip="Redraw" onClick={() => {}} />
          </div>
          <div className="w-px h-4 bg-border mx-2" />
          <div className="flex space-x-1 h-full">
            <MenuButton icon={<ZoomInIcon className="h-4 w-4 stroke-2" />} tooltip="Zoom In" onClick={() => {}} />
            <MenuButton icon={<ZoomOutIcon className="h-4 w-4 stroke-2" />} tooltip="Zoom Out" onClick={() => {}} />
            <MenuButton icon={<MaximizeIcon className="h-4 w-4 stroke-2" />} tooltip="Fit" onClick={() => {}} />
          </div>
          <div className="w-px h-4 bg-border mx-2" />
          <ToggleGroup type="single" value={activeView} onValueChange={setActiveView} className="h-full">
            <ToggleGroupItem value="table" aria-label="Table View" className="h-full px-2 data-[state=on]:bg-accent flex items-center space-x-1">
              <TableIcon className="h-4 w-4 stroke-2" />
              <span className="text-xs">Table</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="network" aria-label="Network View" className="h-full px-2 data-[state=on]:bg-accent flex items-center space-x-1">
              <NetworkIcon className="h-4 w-4 stroke-2" />
              <span className="text-xs">Network</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="geo" aria-label="Geo View" className="h-full px-2 data-[state=on]:bg-accent flex items-center space-x-1">
              <GlobeIcon className="h-4 w-4 stroke-2" />
              <span className="text-xs">Geo</span>
            </ToggleGroupItem>
          </ToggleGroup>
          {activeView === "network" && (
            <>
              <div className="w-px h-4 bg-border mx-2" />
              <div className="flex space-x-1 h-full">
                <MenuButton 
                  icon={<GridIcon className="h-4 w-4 stroke-2" />} 
                  tooltip="Orthogonal Layout" 
                  onClick={() => setNetworkLayout("orthogonal")}
                  isActive={networkLayout === "orthogonal"}
                />
                <MenuButton 
                  icon={<ShareIcon className="h-4 w-4 stroke-2" />} 
                  tooltip="Force Directed Layout" 
                  onClick={() => setNetworkLayout("force-directed")}
                  isActive={networkLayout === "force-directed"}
                />
                <MenuButton 
                  icon={<CircleIcon className="h-4 w-4 stroke-2" />} 
                  tooltip="Radial Layout" 
                  onClick={() => setNetworkLayout("radial")}
                  isActive={networkLayout === "radial"}
                />
                <MenuButton 
                  icon={<GitCommitIcon className="h-4 w-4 stroke-2" />} 
                  tooltip="Circular Layout" 
                  onClick={() => setNetworkLayout("circular")}
                  isActive={networkLayout === "circular"}
                />
                <MenuButton 
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

          <MenuButton 
            icon={<SettingsIcon className="h-4 w-4 stroke-2" />} 
            tooltip="Display Settings" 
            onClick={() => setRightPanel(rightPanel === "settings" ? "none" : "settings")}
            isActive={rightPanel === "settings"}
          />
          <MenuButton 
            icon={rightPanel === "content" ? <PanelRightCloseIcon className="h-4 w-4 stroke-2" /> : <PanelRightOpenIcon className="h-4 w-4 stroke-2" />} 
            tooltip={rightPanel === "content" ? "Close right panel" : "Open right panel"}
            onClick={() => setRightPanel(rightPanel === "content" ? "none" : "content")}
            isActive={rightPanel === "content"}
          />
        </div>
      </div>
      <div className="flex flex-1 bg-background">
        <div className="flex-1">
          {/* Main content area */}
        </div>
        {rightPanel !== "none" && (
          <Card className="w-[460px] h-[calc(100vh-30px)] rounded-none shadow-none">
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