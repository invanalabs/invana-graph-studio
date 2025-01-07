import React from 'react';
import { Graphin } from '@antv/graphin';
// import {
//   DragCanvas, ZoomCanvas, ClickSelect, BrushSelect,
//   DragNode, LassoSelect, DragCombo,
//   ActivateRelations, Hoverable
// } from '@antv/graphin/es/behaviors';

// import { MiniMap } from '@antv/graphin/es/components'

// const { MiniMap, ContextMenu, SnapLine } = Components;


export const CanvasGraph: React.FC = () => {
  return (
    <Graphin
      options={{
        autoResize: true,
        data: {
          nodes: [
            { id: 'node-1', style: { x: 50, y: 100 } },
            { id: 'node-2', style: { x: 150, y: 100 } },
          ],
          edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }}
    >

      {/* <MiniMap /> */}

    </Graphin>
  );
}
