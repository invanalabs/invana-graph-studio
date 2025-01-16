import { IElementEvent, NodeData, EdgeData, ComboData } from '@antv/g6';
import { Card } from '@invana/ui';
import React from 'react';
import { createRoot } from 'react-dom/client';


export const MINIMAP_PLUGIN = {
  type: 'minimap',
  size: [240, 160],
  className: 'minimap',
  position: 'bottom-left',
  // position: 'bottomLeft',
  // delegateStyle: {
  //   fill: 'rgba(0, 0, 0, 0.1)',
  //   stroke: '#5B8FF9',
  // },
}

export const HISTORY_PLUGIN = {
  type: 'history',
  key: 'history',
}

export const GRID_PLUGIN = {
  type: 'grid-line', key: 'grid-line', follow: true, lineStyle: {
    stroke: '#222222', // Set grid line color
    lineWidth: 1, // Set line width
  },
}

export const TOOLTIP_PLUGIN = {
  type: 'tooltip',
  enable: true,
  trigger: 'hover',
  getContent: (e: IElementEvent, items: NodeData | EdgeData | ComboData[]): Promise<HTMLElement | string> => {
    console.log("TOOLTIP_PLUGIN e", e, items);
    if (!items || items.length === 0) return Promise.resolve("");
    const node = items[0] as NodeData;
    // console.log("TOOLTIP_PLUGIN node", node);
    const content = document.createElement('div');
    content.innerHTML = `
    <div>
    <h2 className="text-2xl font-bold">${node.label}</h2>
    <p className="text-muted-foreground">${node.type}</p>
    </div>
    <div className="flex items-center space-x-2 text-sm">
      <span className="text-muted-foreground">ID:</span>
      <Badge variant="secondary">${node.id}</Badge>
    </div>
    `;
    return Promise.resolve(content);
  }

}