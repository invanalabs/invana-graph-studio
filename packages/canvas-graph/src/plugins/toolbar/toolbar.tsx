import React from "react";
import { Graph } from "@antv/g6";
import { useGraphin } from "@antv/graphin";
import { Button } from "@invana/ui";

interface ZoomControlsProps {
  graph?: Graph | null;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({ graph }) => {

  const { graph: contextGraph } = useGraphin(); // Access the graph instance from context

  console.log("ZoomControls -> graph", graph)
  if (!graph) {
    graph = contextGraph;
  }

  const zoomIn = () => {
    const currentZoom = graph?.getZoom();
    if (currentZoom)
      graph?.zoomTo(currentZoom + 0.2);
  };

  const zoomOut = () => {
    const currentZoom = graph?.getZoom();
    if (currentZoom)
      graph?.zoomTo(currentZoom - 0.2);
  };

  const fitView = () => {
    graph?.fitView();
  };

  return (
    <div className="zoom-controls">
      <Button onClick={zoomIn}>Zoom In</Button>
      <Button onClick={zoomOut}>Zoom Out</Button>
      <Button onClick={fitView}>Fit View</Button>
    </div>
  );
};
