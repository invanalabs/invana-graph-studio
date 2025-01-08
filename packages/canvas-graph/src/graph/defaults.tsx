import { GraphOptions } from '@antv/g6';


export const defaultOptions: GraphOptions = {
  autoResize: true,
  autoFit: 'center',
  animation: true,

  behaviors: [
    'drag-canvas',
    'zoom-canvas',
    'drag-element',
    {
      type: 'hover-activate',
      degree: 1, // 👈🏻 Activate relations.
    },
    { type: 'click-select', multiple: true, trigger: ['shift'] },
    {
      type: 'brush-select',
      immediately: true,
      mode: 'default',
    }, // needs shift
  ],
  layout: {
    type: 'force',
    preventOverlap: true,
    nodeSize: 24,
  },
  plugins: [
    { type: 'grid-line', key: 'grid-line', follow: true },
    {
      type: 'minimap',
      size: [240, 160],
    },
  ],
  data: {
    nodes: [],
    edges: []
  },
  // data: {
  //   nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  //   edges: [
  //     { source: 'node-0', target: 'node-1' },
  //     { source: 'node-0', target: 'node-2' },
  //     { source: 'node-0', target: 'node-3' },
  //     { source: 'node-0', target: 'node-4' },
  //     { source: 'node-1', target: 'node-0' },
  //     { source: 'node-2', target: 'node-0' },
  //     { source: 'node-3', target: 'node-0' },
  //     { source: 'node-4', target: 'node-0' },
  //     { source: 'node-5', target: 'node-0' },
  //   ],
  // },
}