import { GraphOptions } from '@antv/g6';
import { defaultLayoutsOptions } from './layouts';

export const DEFAULT_LAYOUT = 'grid'

export const defaultOptions: GraphOptions = {
  autoResize: true,
  autoFit: 'center',
  animation: false,
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
  layout: defaultLayoutsOptions.find((item) => item.type === DEFAULT_LAYOUT),
  node: {
    // size: [80, 40],
    style: {
      fill: '#0fbb60',
      stroke: '#5B8FF9'
    }
  },
  edge: {
    style: {
      stroke: '#A3B1BF',
      lineWidth: 2
    }
  },
  plugins: [
    { type: 'grid-line', key: 'grid-line', follow: true },
    {
      type: 'minimap',
      size: [240, 160],
    },
    {
      type: 'history',
      key: 'history',
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