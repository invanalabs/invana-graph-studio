"use client"

import { useState } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Monitor, RefreshCwIcon, PanelRightOpenIcon, PanelRightCloseIcon, } from "lucide-react"
import { ToolBarButton } from "@/components/structures/toolbar-button"

export default function ModellerMainToolBar() {
    const [nodeSize, setNodeSize] = useState(10)
    const [showLabels, setShowLabels] = useState(true)
    const [rightPanel, setRightPanel] = useState<"none" | "settings" | "content">("none")


    return (
        <div className="flex flex-col ">
            <TooltipProvider>
                <div className="flex items-center justify-between space-x-2 px-2 bg-background border-b h-[30px]">
                    <div className="flex items-center space-x-2 h-full">
                        <div className="flex space-x-1 h-full">
                            {/* <ToolBarButton icon={<Trash2Icon className="h-4 w-4 stroke-2" />} tooltip="Clear" onClick={() => { }} /> */}
                            <ToolBarButton icon={<RefreshCwIcon className="h-4 w-4 stroke-2" />} tooltip="fetch latest schema" onClick={() => { }} />
                        </div>

                    </div>
                    <div className="flex space-x-1 h-full">

                        <ToolBarButton
                            icon={<Monitor className="h-4 w-4 stroke-2" />}
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
                </div>
            </TooltipProvider>


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