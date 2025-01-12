import { GraphOptions } from '@antv/g6';
import { defaultLayoutsOptions } from './layouts';
import { DRAG_CANVAS, ZOOM_CANVAS, DRAG_ELEMENT, HOVER_ACTIVATE, CLICK_SELECT, BRUSH_SELECT } from '../options/behaviors';
import { MAP_NODE_SIZE } from '../options/transforms';
import { DEFAULT_EDGE_STYLE, DEFAULT_NODE_STYLE } from '../options/elements';
import { HISTORY_PLUGIN, MINIMAP_PLUGIN } from '../options/plugins';

export const DEFAULT_LAYOUT = 'grid'

export const defaultOptions: GraphOptions = {
  autoResize: true,
  autoFit: 'view', // 'view' | 'graph' | 'center'
  animation: false,
  behaviors: [
    DRAG_CANVAS,
    ZOOM_CANVAS,
    DRAG_ELEMENT,
    HOVER_ACTIVATE,
    CLICK_SELECT,
    BRUSH_SELECT
  ],
  transforms: [
    MAP_NODE_SIZE
  ],
  layout: defaultLayoutsOptions.find((item) => item.type === DEFAULT_LAYOUT),
  // theme: 'dark',
  // background: '#222222',
  node: DEFAULT_NODE_STYLE,
  edge: DEFAULT_EDGE_STYLE,
  plugins: [
    MINIMAP_PLUGIN,
    HISTORY_PLUGIN,
    // GRID_PLUGIN
  ],
  data: {
    nodes: [],
    edges: []
  }
}