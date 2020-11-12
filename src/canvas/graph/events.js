// import {colorToNumber, getColor, getLinkLabel, getNodeLabel} from "./old/utils";
// import * as PIXI from 'pixi.js-legacy'

export default class EventStore {

    clickedNodeData = undefined;//
    lastSelectedNodeData = undefined;// used to get the last selected data for nav-ui-components.
    hoveredNodeData = undefined;

    nodeMenuEl = undefined;

    constructor(nodeMenuEl) {
        this.nodeMenuEl = nodeMenuEl;
    }

    showMenu() {
        this.nodeMenuEl.style.display = "block";
    }

    hideMenu() {
        this.nodeMenuEl.style.display = "none";
    }

    onLinkClicked(graphicsEngine, linkData, linkGfx, event) {
        console.log("onNodeClicked", linkData.id, linkGfx, event,)
        this.clickedNodeData = null;
        // this.lastSelectedNodeData = null;
        // graphicsEngine.eventStore.hideMenu();
        graphicsEngine.onElementSelected(linkData);
    }

    onLinkMouseOver(graphicsEngine, linkData, linkGfx, event) {
        console.log(linkData.id, linkGfx, event, "link MouseOver");
        // this.lastSelectedNodeData = null;

        // graphicsEngine.eventStore.hideMenu();
        graphicsEngine.onElementSelected(linkData);

    }

    onLinkMouseOut(graphicsEngine, linkData, linkGfx, event) {
        console.log(linkData.id, linkGfx, event, "link MouseOut");
        // this.lastSelectedNodeData = null;
        // graphicsEngine.eventStore.hideMenu();
        graphicsEngine.onElementSelected(null);
    }

    createNodeMenu(graphicsEngine, nodeData, event) {
        console.log("createNode Menu", nodeData, event);
        this.nodeMenuEl.style.left = event.data.global.x + graphicsEngine.settings.NODE_MENU_X_PADDING + "px";
        this.nodeMenuEl.style.top = event.data.global.y + graphicsEngine.settings.NODE_MENU_Y_PADDING + "px";
    }


    onNodeRightClicked(graphicsEngine, nodeData, nodeContainer, event) {
        this.showMenu();
        this.clickedNodeData = nodeData;
        this.lastSelectedNodeData = nodeData;
        console.log(this.clickedNodeData.id, " clicked");
        graphicsEngine.onElementSelected(nodeData);
        console.log("clicked", event);
        this.createNodeMenu(graphicsEngine, nodeData, event);

    }

    onNodeClicked(graphicsEngine, nodeData, nodeContainer, event) {
        console.log("onNodeClicked", nodeContainer, event)
        this.clickedNodeData = nodeData;
        this.lastSelectedNodeData = nodeData;
        console.log(this.clickedNodeData.id, " clicked");
        graphicsEngine.onElementSelected(nodeData);
    }

    focusGraph(graphicsEngine) {
        console.log("====graphicsEngine", graphicsEngine)
    }

    highlightNodes(graphicsEngine, nodes) {
        console.log("highlightNodes ", nodes);
        // add hover effect
        graphicsEngine.graphicsStore.focusOnNodes(nodes);
    }

    unHighlightNode(graphicsEngine, nodeData) {
        console.log("=====unHighlightNode", nodeData)
        graphicsEngine.graphicsStore.resetFocus();
        graphicsEngine.requestRender();
    }

    onNodeMouseOver(graphicsEngine, nodeData, nodeContainer, event) {
        console.log(nodeData.id, nodeContainer, event, " mouseover");

        graphicsEngine.onElementSelected(nodeData);

        // if the last selected element is not this node, hide the menu.
        // const lastSelectedNodeData  = graphicsEngine.dataStore.lastSelectedNodeData;
        if (this.clickedNodeData && this.clickedNodeData.id !== nodeData.id) {
            this.hideMenu();
        }


        if (graphicsEngine.dataStore.getUniqueFocusedNodes().length > 0) {
            // if (graphicsEngine.dataStore.checkIfNodeExistInFocused(nodeData){
            // dont hover-highlight when there is focus selected.
            return
        }

        if (nodeData) {
            // let focusedNodes = graphicsEngine.dataStore.getUniqueFocusedNodes();
            // const isExist = graphicsEngine.dataStore.checkIfVertexExistInFocused(nodeData);
            // if (!isExist){
            //     focusedNodes.push(nodeData);
            // }
            this.highlightNodes(graphicsEngine, [nodeData])
            // for drag feature
            if (this.clickedNodeData) {
                return;
            }
            this.hoveredNodeData = nodeData;
            graphicsEngine.requestRender();
        }

    }

    onNodeMouseOut(graphicsEngine, nodeData, nodeContainer, event) {
        console.log(nodeData.id, nodeContainer, event, " mouseout");
        if (graphicsEngine.dataStore.getUniqueFocusedNodes().length > 0) {
            // if (graphicsEngine.dataStore.checkIfNodeExistInFocused(nodeData){
            // dont hover-highlight when there is focus selected.
            return
        }
        this.unHighlightNode(graphicsEngine, nodeData)

        if (this.clickedNodeData) {
            return;
        }
    }

    unsetSelectedNodeData() {
        this.clickedNodeData = undefined;
    }


    onNodeUnClicked(graphicsEngine, nodeData, nodeContainer, event) {
        console.log("===onNodeUnClicked", nodeContainer, event, nodeData);
        this.unsetSelectedNodeData();

        // // disable node dragging
        // graphicsEngine.pixiApp.renderer.plugins.interaction.off('mousemove', (event) => this.appMouseMove(event, graphicsEngine));
        // // enable viewport dragging
        // graphicsEngine.viewport.pause = false;
    }

}
