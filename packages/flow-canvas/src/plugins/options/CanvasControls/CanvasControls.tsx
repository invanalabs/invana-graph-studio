import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@invana/ui/components/ui/select"
import { Separator } from "@invana/ui/components/ui/separator"
import { ButtonWithTooltip } from "@invana/ui/components/ui-extended/button-with-tooltip"
import { useReactFlow, useViewport, BackgroundVariant } from "@xyflow/react";
import { Eraser, Minus, MoveDown, MoveLeft, MoveRight, MoveUp, Plus } from "lucide-react";
// import { cn } from "../../../lib/utils";


export const CanvasControls = () => {

  // Background, Erase, defaultEdges

  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView, getEdges, setNodes, setEdges } = useReactFlow();
  const [defaultEdgeType, setDefaultEdgeType] = React.useState('default');

  const onEdgeTypeChange = (value: string) => {

    setDefaultEdgeType(value);

    const edges = getEdges();
    edges.forEach(edge => {
      edge.type = value;
    });
    setEdges(edges)
  }

  const eraseCanvas = () => {
    setNodes([])
    setEdges([])
  }


  const onZoomChange = (value: string) => {
    if (value === "fitview") {
      fitView({ duration: 300 });
    }
    else {
      zoomTo(Number(value) / 100, { duration: 300 });
    }
  }

  return (
    <>
      <Select onValueChange={onZoomChange}>
        <SelectTrigger className="border-none hover:border-none focus:border-none active:border-none ring-0 shadow-none !w-[100px] ">
          <SelectValue placeholder={(100 * zoom).toFixed(0)} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(BackgroundVariant).map((variant) => (
            <SelectItem key={variant} value={variant}>
              {variant}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onEdgeTypeChange}>
        <SelectTrigger className="border-none hover:border-none focus:border-none active:border-none ring-0 shadow-none !w-[140px] ">
          <SelectValue placeholder={defaultEdgeType} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">default</SelectItem>
          <SelectItem value="bezier">Bezier</SelectItem>
          <SelectItem value="straight">Straight</SelectItem>
          <SelectItem value="step">Step</SelectItem>
          <SelectItem value="smoothstep">Smoothstep</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" />

      <Select onValueChange={(value) => console.log(value)} defaultValue="left-to-right">
        <SelectTrigger className="w-[150px] border-none hover:border-none focus:border-none active:border-none ring-0 shadow-none">
          <SelectValue placeholder="Dagre Options" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="left-to-right">
            <span className="flex items-center"><MoveRight className="w-4 h-4 mr-2" /> Left to Right</span>
          </SelectItem>
          <SelectItem value="right-to-left">
            <span className="flex items-center"><MoveLeft className="w-4 h-4 mr-2" /> Right to Left</span>
          </SelectItem>
          <SelectItem value="top-to-bottom">
            <span className="flex items-center"><MoveDown className="w-4 h-4 mr-2" /> Top to Bottom</span>
          </SelectItem>
          <SelectItem value="bottom-to-top">
            <span className="flex items-center"><MoveUp className="w-4 h-4 mr-2" /> Bottom to Top</span>
          </SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" />
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => eraseCanvas()}
        tooltip={<p>Erase Everything</p>}
      >
        <Eraser className="h-4 w-4" />
      </ButtonWithTooltip>

    </>
  )
}