import React from "react";
import { GraphinContext } from "@antv/graphin";
import { Button } from "@invana/ui";


export const ZoomControls: React.FC = () => {

  const { graph } = React.useContext(GraphinContext); // Access the graph instance from context

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
