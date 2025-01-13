import React from 'react';
import { Graphin } from '@antv/graphin';
import { Graph, GraphOptions, IEvent, NodeEvent } from '@antv/g6';
import { defaultOptions } from './defaults';
// import { GraphStore } from '../graphStore';
import { CanvasToolBar } from '../plugins';
import { GraphManager } from '../graphManager';
import { ICanvasData } from '@invana/data-store';
// import { CanvasToolBar } from '../plugins/';


// export const CanvasGraph: React.FC = (props) => {
//   const options: GraphOptions = { ...defaultOptions, ...props }
//   const [graph, setGraph] = React.useState<Graph | null>(null);
//   return (
//     <>
//       <ZoomControls graph={graph} />
//       <div style={{ width: 'calc(100% - 2px)', height: 'calc(100vh )' }}>
//         <Graphin
//           onReady={(graph) => setGraph(graph)}
//           options={options}
//         >
//         </Graphin>
//       </div>
//     </>
//   );
// }

export interface CanvasGraphProps {
  initialData: ICanvasData;
  options?: Omit<GraphOptions, 'data'>;
  style?: React.CSSProperties;
  // graph?: Graph;
  graphManager?: GraphManager; //comes with inbuilt graphStore or user can pass their own
  onReady?: () => void;
  header?: boolean;
}

export const CanvasGraph: React.FC<CanvasGraphProps> = (props) => {
  console.log("CanvasGraph props", props);
  const { options, style, header = false } = props;
  const graphOptions: GraphOptions = { ...defaultOptions, ...options };
  // const [graphStore, setGraphStore] = React.useState<GraphStore | null>(null);

  const [graph, setGraph] = React.useState<Graph | null>(null);
  // const graphRef = React.useRef<Graph | null>(props.graph ?? null);

  graph?.on(NodeEvent.POINTER_ENTER, (event: IEvent) => {
    console.log('POINTER_ENTER event', event);
    // graph.updateNodeData([{ id: target.id, style: { labelText: 'Hover me!', fill: '#5B8FF9', labelFill: 'black' } }]);
    // graph.draw();
  });

  graph?.on(NodeEvent.POINTER_OUT, (event: IEvent) => {
    console.log('POINTER_OUT event', event);
    // graph.updateNodeData([{ id: target.id, style: { labelText: 'Hover me!', fill: '#5B8FF9', labelFill: 'black' } }]);
    // graph.draw();
  });


  // const GraphStore = new GraphStore(graph);


  // props.graph?.on(NodeEvent.CLICK, (event: IEvent) => {
  //   console.log('node.CLICK event', event);
  //   // graph.updateNodeData([{ id: target.id, style: { labelText: 'Hover me!', fill: '#5B8FF9', labelFill: 'black' } }]);
  //   // graph.draw();
  // });

  // Event listener for right-click on nodes
  graph?.on(NodeEvent.CONTEXT_MENU, (evt) => {
    console.log('CONTEXT_MENU event', evt);
    // evt.preventDefault();
    // const { canvasX, canvasY } = evt;

    // // Show the context menu
    // contextMenu.style.left = `${canvasX}px`;
    // contextMenu.style.top = `${canvasY}px`;
    // contextMenu.style.visibility = 'visible';

    // // Close the menu when clicking outside
    // document.addEventListener('click', () => {
    //   contextMenu.style.visibility = 'hidden';
    // }, { once: true });
  });

  console.log("props.initialData", props.initialData);
  //@ts-ignore
  const graphManager = props.graphManager ? props.graphManager : new GraphManager(null);

  return (
    <div style={props?.style || {}}>
      {graph && header && <CanvasToolBar graph={graph} />}
      <Graphin
        onReady={(graph) => {
          if (graphManager) {
            graphManager.setGraph(graph);
          }

          graphManager?.graphStore.addData(
            props.initialData ?? { 'nodes': [], 'edges': [] },
            () => graphManager?.g6graph.render()
          );

          setGraph(graph);
          // graphRef.current = graph;
          if (props.onReady) {
            props.onReady();
          }
        }}
        style={style}
        options={graphOptions}
      >
      </Graphin>
    </div>
  );
}
