import { GraphOptions } from '@antv/g6';
import { defaultLayoutsOptions } from './layouts';
// import G6 from '@antv/g6';

export const DEFAULT_LAYOUT = 'grid'

export const defaultOptions: GraphOptions = {
  autoResize: true,
  autoFit: 'view', // 'view' | 'graph' | 'center'
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
  // transforms: [
  //   {
  //     type: 'map-node-size',
  //     scale: 'linear',
  //     maxSize: 60,
  //     minSize: 20,
  //     mapLabelSize: [12, 24]
  //   },
  // ],
  layout: defaultLayoutsOptions.find((item) => item.type === DEFAULT_LAYOUT),
  theme: 'dark',
  background: '#222222',
  node: { // https://g6.antv.antgroup.com/en/examples/element/label/#background
    // type: "graphin-circle",
    style: {
      halo: true,
      labelText: (d) => d.id,
      labelPosition: 'bottom',
      fillOpacity: 0.85,
      strokeOpacity: 1

    },
    // size: [80, 40],
    // style: {
    //   fill: '#0fbb60',
    //   stroke: '#5B8FF9',
    //   size: 25
    // },
    palette: {
      type: 'group',
      field: 'groupName',
    },
  },
  edge: {  // https://g6.antv.antgroup.com/en/examples/element/label/#background
    type: 'line',
    style: {
      labelText: (d) => d.id,
      // labelBackground: true,
      labelTextAlign: 'center',
      // labelTextStroke: 'red',
      labelAutoRotate: true,
      labelBackgroundOpacity: 0.8,
      // labelBackgroundStroke: '#9ec9ff',
      labelFill: '#949494',

      endArrow: true,
      // edge: {
      //   style: {
      stroke: '#343434',
      lineWidth: 1
    },
    palette: {
      type: 'group',
      field: 'groupName',
    },
  },
  plugins: [
    // {
    //   type: 'grid-line', key: 'grid-line', follow: true, lineStyle: {
    //     stroke: '#222222', // Set grid line color
    //     lineWidth: 1, // Set line width
    //   },
    // },
    {
      type: 'minimap',
      size: [240, 160],
      className: 'minimap',
      // position: 'bottomLeft',
      // delegateStyle: {
      //   fill: 'rgba(0, 0, 0, 0.1)',
      //   stroke: '#5B8FF9',
      // },
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