import { NodeOptions, EdgeOptions } from "@antv/g6"

export const DEFAULT_NODE_STYLE: NodeOptions = { // https://g6.antv.antgroup.com/en/examples/element/label/#background
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
}

export const DEFAULT_EDGE_STYLE: EdgeOptions = {  // https://g6.antv.antgroup.com/en/examples/element/label/#background
  type: 'line',
  style: {
    labelText: (d) => {
      if (d.id) return d.id
      else return d.source + '-' + d.target
    },
    // labelBackground: true,
    labelTextAlign: 'center',
    // labelTextStroke: 'red',
    labelAutoRotate: true,
    labelBackgroundOpacity: 0.8,
    // labelBackgroundStroke: '#9ec9ff',
    labelFill: '#646464',

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
}