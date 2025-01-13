import React, { useEffect } from 'react';
import { Graphin, useGraphin } from '@antv/graphin';
import { Graph, GraphOptions, IEvent, NodeEvent } from '@antv/g6';
import { defaultOptions } from './defaults';
import GraphStore from '../graphStore/graphStore';
import { CanvasToolBar } from '../plugins';
import { GraphDataStore } from '@invana/data-store';
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
  options?: GraphOptions;
  style?: React.CSSProperties;
  graph: Graph;
  dataStore?: GraphDataStore
  onReady?: (graph: Graph) => void;
  header?: boolean;
}



export const CanvasGraph: React.FC<CanvasGraphProps> = (props) => {
  const { options, style, graph, onReady, header = false } = props;
  const graphOptions: GraphOptions = { ...defaultOptions, ...options }
  // const [graph, setGraph] = React.useState<Graph | null>(null);

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


  const graphStore = new GraphStore(props.graph);
  // const GraphStore = new GraphStore(graph);


  // props.graph?.on(NodeEvent.CLICK, (event: IEvent) => {
  //   console.log('node.CLICK event', event);
  //   // graph.updateNodeData([{ id: target.id, style: { labelText: 'Hover me!', fill: '#5B8FF9', labelFill: 'black' } }]);
  //   // graph.draw();
  // });

  // Event listener for right-click on nodes
  props.graph?.on(NodeEvent.CONTEXT_MENU, (evt) => {
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








  return (
    <div style={props?.style || {}}>
      {header && <CanvasToolBar graph={props.graph} />}
      <Graphin
        onReady={(graph) => {
          // setGraph(graph);
          if (onReady) {
            onReady(graph);
          }
          // graphStore.setTheme('dark');
        }}
        style={style}
        options={graphOptions}
      >
      </Graphin>
    </div>
  );
}
