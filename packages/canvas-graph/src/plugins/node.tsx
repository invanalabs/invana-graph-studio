import React, { useState } from 'react';
import { Graphin, ContextMenu, GraphinContext } from '@antv/graphin';
import { Card } from '@invana/ui';
import { NodeEvent } from '@antv/g6';

export const NodeContextMenu: React.FC = () => {
  const { graph } = React.useContext(GraphinContext);

  if (!graph) return

  const [contextMenuData, setContextMenuData] = useState<{
    visible: boolean;
    x: number;
    y: number;
    nodeData: any;
  }>({
    visible: false,
    x: 0,
    y: 0,
    nodeData: null,
  });

  const handleNodeContextMenu = (e: any) => {
    e.preventDefault(); // Prevent the default browser context menu
    const { item, canvas } = e;
    console.log('handleNodeContextMenu CONTEXT_MENU event', e, item, canvas);
    // const model = item.getModel();

    setContextMenuData({
      visible: true,
      x: canvas.x,
      y: canvas.y,
      nodeData: {},
    });
  };

  const closeContextMenu = () => {
    setContextMenuData({
      ...contextMenuData,
      visible: false,
    });
  };

  React.useEffect(() => {
    graph.on(NodeEvent.CONTEXT_MENU, handleNodeContextMenu);
    return () => {
      graph.off(NodeEvent.CONTEXT_MENU, handleNodeContextMenu);
    };
  }, [graph]);

  console.log("contextMenu graph", graph)

  console.log("=====contextMenuData.visible", contextMenuData.visible)
  return (
    <>
      {/* <Graphin data={{ nodes: [], edges: [] }}> */}
      {/* Context Menu Overlay */}
      {contextMenuData.visible && (
        <div
          style={{
            position: 'absolute',
            top: contextMenuData.y,
            left: contextMenuData.x,
            zIndex: 10,
            pointerEvents: 'auto',
          }}
          onMouseLeave={closeContextMenu}
        >
          <Card>
            <div>
              <h3 className="font-bold">Node Information</h3>
              <p>
                <strong>ID:</strong> {contextMenuData.nodeData.id}
              </p>
              <p>
                <strong>Label:</strong> {contextMenuData.nodeData.label || 'N/A'}
              </p>
              <p className="text-gray-600">Right-click menu actions can go here.</p>
            </div>
          </Card>
        </div>
      )}
      {/* </Graphin> */}
    </>
  );
};

