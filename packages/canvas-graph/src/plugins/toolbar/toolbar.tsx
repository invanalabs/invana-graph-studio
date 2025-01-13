import React, { useState } from "react";
import { Graph, History } from "@antv/g6";
// import { useGraphin } from "@antv/graphin";
import {
  ButtonWithTooltip, Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue, Separator,
  ToggleGroup,
  ToggleGroupItem
} from "@invana/ui";
import {
  CircleDashed, Eraser, LayoutGrid, Lock, Minus,
  MoveLeft, MoveRight, Network, Plus, RefreshCcw, Share2, Unlock
} from "lucide-react";
import { defaultLayoutsOptions } from "@invana/canvas-graph/graph/layouts";

interface CanvasToolBarProps {
  getGraph: () => Graph;
  className?: string;
}


const animation = {
  duration: 500,
  easing: 'linear',
};

export const CanvasToolBar: React.FC<CanvasToolBarProps> = ({ getGraph, className }) => {

  // const { graph: contextGraph } = useGraphin(); // Access the graph instance from context

  console.log("CanvasToolBar -> graph", getGraph())


  const history: History | undefined = getGraph()?.getPluginInstance('history');

  const getIsLocked = () => {
    const behaviors = getGraph()?.getBehaviors() || [];
    return !behaviors.includes('drag-element')
  }

  const [isLocked, setIsLocked] = useState<true | false>(getIsLocked())

  const zoom = getGraph()?.getZoom() ?? 1;

  const zoomIn = () => {
    const currentZoom = getGraph()?.getZoom();
    if (currentZoom)
      getGraph()?.zoomTo(currentZoom + 0.2, animation);
  };

  const zoomOut = () => {
    const currentZoom = getGraph()?.getZoom();
    if (currentZoom)
      getGraph()?.zoomTo(currentZoom - 0.2, animation);
  };

  const fitView = () => {
    getGraph()?.fitView({}, animation);
  };

  const onZoomChange = (value: string) => {
    if (value === "fitview") {
      fitView();
    }
    else {
      getGraph()?.zoomTo(Number(value) / 100);
    }
  };

  const eraseCanvas = () => {
    getGraph()?.clear();
  }


  const toggleLockCanvas = () => {
    // remove drag-element from behaviours
    const behaviors = getGraph()?.getBehaviors() || [];
    if (getIsLocked()) {
      const updatedBehaviors = behaviors.filter(b => b !== 'drag-element');
      getGraph()?.setBehaviors(updatedBehaviors);
      setIsLocked(false)
    } else {
      const updatedBehaviors = [...behaviors, 'drag-element'];
      getGraph()?.setBehaviors(updatedBehaviors);
      setIsLocked(true)
    }
  }


  const updateLayout = (layoutName: string) => {
    const layoutConfig = defaultLayoutsOptions.find((item) => item.type === layoutName);
    console.log("updateLayout -> layoutConfig", layoutConfig)
    if (layoutConfig) {
      getGraph()?.setLayout(layoutConfig);
      getGraph()?.render()
    }
  }


  // if (!getGraph()) {
  //   return
  // }

  return (
    <div className={`zoom-controls transition-colors items-center shadow-sm
              bg-transparent text-card-foreground flex-1 flex justify-center gap-1 sm:gap-2 ${className || ''}`} >

      <ButtonWithTooltip
        variant="ghost"
        size="icon-sm"
        className="rounded-none"
        onClick={() => {
          if (history?.canUndo()) {
            history?.undo()
          }
        }}
        tooltip={<p>Undo</p>}
      >
        <MoveLeft className="h-4 w-4  " />
      </ButtonWithTooltip>
      <ButtonWithTooltip
        variant="ghost"
        size="icon-sm"
        className="rounded-none"
        onClick={() => getGraph()?.render()}
        tooltip={<p>Redraw</p>}
      >
        <RefreshCcw className="h-4 w-4 " />
      </ButtonWithTooltip>
      <ButtonWithTooltip
        variant="ghost"
        size="icon-sm"
        className="rounded-none"
        onClick={() => {
          if (history?.canRedo()) {
            history?.redo()
          }
        }}
        tooltip={<p>Redo</p>}
      >
        <MoveRight className="h-4 w-4 " />
      </ButtonWithTooltip>
      <Separator orientation="vertical" className="h-4" />

      <Select onValueChange={onZoomChange}>
        <SelectTrigger className="h-7 w-7 border-none hover:border-none focus:border-none active:border-none
        rounded-none ring-0 shadow-none !w-[95px] ">
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
      <Separator orientation="vertical" className="h-4" />
      <ButtonWithTooltip
        variant="ghost"
        size="icon-sm"
        className="rounded-none"
        onClick={() => zoomOut()}
        tooltip={<p>Zoom out</p>}
      >
        <Minus className="h-4 w-4" />
      </ButtonWithTooltip>
      <ButtonWithTooltip
        variant="ghost"
        size="icon-sm"
        className="rounded-none"
        onClick={() => zoomIn()}
        tooltip={<p>Zoom In</p>}
      >
        <Plus className="h-4 w-4" />
      </ButtonWithTooltip>
      <Separator orientation="vertical" className="h-4" />

      <ButtonWithTooltip
        variant="ghost"
        size="icon-sm"
        className="rounded-none"
        onClick={() => eraseCanvas()}
        tooltip={<p>Erase Canvas</p>}
      >
        <Eraser className="h-4 w-4" />
      </ButtonWithTooltip>

      <Separator orientation="vertical" className="h-4" />

      <ButtonWithTooltip
        variant="ghost"
        size="icon-sm"
        className="rounded-none"
        onClick={() => toggleLockCanvas()}
        tooltip={<p>{isLocked ? 'Unlock canvas' : 'Lock canvas'}</p>}
      >
        {isLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4  " />}
      </ButtonWithTooltip>
      <Separator orientation="vertical" className="h-4" />

      <ToggleGroup type="single" onValueChange={(value) => updateLayout(value)} >
        <ToggleGroupItem value="gForce">
          <ButtonWithTooltip
            variant="ghost"
            size="icon-sm"
            className="rounded-none"
            tooltip={<p>Force Layout</p>}
          >
            <Share2 className="h-4 w-4" />
          </ButtonWithTooltip>
        </ToggleGroupItem>
        <ToggleGroupItem value="circular">
          <ButtonWithTooltip
            variant="ghost"
            size="icon-sm"
            className="rounded-none"
            tooltip={<p>Circlular Layout</p>}
          >
            <CircleDashed className="h-4 w-4" />
          </ButtonWithTooltip>
        </ToggleGroupItem>

        <ToggleGroupItem value="grid">
          <ButtonWithTooltip
            variant="ghost"
            size="icon-sm"
            className="rounded-none"
            tooltip={<p>Grid Layout</p>}
          >
            <LayoutGrid className="h-4 w-4" />
          </ButtonWithTooltip>
        </ToggleGroupItem>


        <ToggleGroupItem value="dagre">
          <ButtonWithTooltip
            variant="ghost"
            size="icon-sm"
            className="rounded-none rotate-270"
            tooltip={<p>Dagre Layout</p>}
          >
            <Network className="h-4 w-4" />
          </ButtonWithTooltip>
        </ToggleGroupItem>


      </ToggleGroup>

    </div>
  );
};
