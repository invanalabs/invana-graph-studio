import { BaseContextMenu } from "./abstract";
import { GraphEvent } from '@antv/g6';

export class NodeContextMenu extends BaseContextMenu {
  protected bindEvents() {
    if (!this.graph) return;
    this.graph.on('node:contextmenu', (evt: any) => {
      evt.preventDefault();
      const { canvasX, canvasY, item } = evt;
      const content = `
        <div style="padding: 8px; cursor: pointer;" data-action="edit">Edit Node</div>
        <div style="padding: 8px; cursor: pointer;" data-action="delete">Delete Node</div>
      `;
      this.showMenu(canvasX, canvasY, content);
    });

    this.graph.on('canvas:click', () => this.hideMenu());
  }

  protected handleMenuClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const action = target.getAttribute('data-action');
    console.log('Node action:', action);

    // const graph = this.graph;
    // const selectedNodes = this.graph?.findAllByState('node', 'selected');
    // const item = selectedNodes?.[0];

    // if (action === 'edit') {
    //   console.log('Edit node:', item?.getModel());
    // } else if (action === 'delete' && graph && item) {
    //   // graph.remove(item);
    // }

    this.hideMenu();
  }
}
