


export const DRAG_CANVAS = 'drag-canvas'
export const ZOOM_CANVAS = 'zoom-canvas'
export const DRAG_ELEMENT = 'drag-element'
export const HOVER_ACTIVATE = {
  type: 'hover-activate',
  degree: 1,
  state: 'highlight',
  inactiveState: 'dim',
  onHover: (event: any) => {
    // console.log("====onHover", event)
    event.view.setCursor('pointer');
  },
  onHoverEnd: (event: any) => {
    event.view.setCursor('default');
  },
}

export const CLICK_SELECT = {
  type: 'click-select',
  multiple: true,
  trigger: ['shift'],
}

export const BRUSH_SELECT = {
  type: 'brush-select',
  immediately: true,
  mode: 'default',
}
