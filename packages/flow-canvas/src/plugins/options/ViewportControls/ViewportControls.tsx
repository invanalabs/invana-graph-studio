import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@invana/ui/components/ui/select"
import { Separator } from "@invana/ui/components/ui/separator"
import { ButtonWithTooltip } from "@invana/ui/components/ui-extended/button-with-tooltip"
import { ColorMode, useReactFlow, useStoreApi, useViewport } from "@xyflow/react";
import { Minus, Plus } from "lucide-react";
// import { cn } from "../../../lib/utils";


export const ViewportControls = () => {




  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();

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
      <ButtonWithTooltip
        variant="ghost"
        size="icon-sm"
        onClick={() => zoomOut({ duration: 300 })}
        tooltip={<p>Zoom out</p>}
      >
        <Minus className="h-4 w-4" />
      </ButtonWithTooltip>
      <Select onValueChange={onZoomChange}>
        <SelectTrigger className="h-7 w-7 border-none hover:border-none focus:border-none active:border-none ring-0 shadow-none !w-[90px] ">
          <SelectValue placeholder={(100 * zoom).toFixed(0) + "%"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10%</SelectItem>
          <SelectItem value="25">25%</SelectItem>
          <SelectItem value="50">50%</SelectItem>
          <SelectItem value="100">100%</SelectItem>
          <SelectItem value="200">200%</SelectItem>
          <SelectItem value="fitview">Fit View</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" />

      <ButtonWithTooltip
        variant="ghost"
        size="icon-sm"
        onClick={() => zoomIn({ duration: 300 })}
        tooltip={<p>Zoom In</p>}
      >
        <Plus className="h-4 w-4" />
      </ButtonWithTooltip>

    </>
  )
}