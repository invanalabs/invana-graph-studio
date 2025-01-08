import React from 'react';
import { Graphin } from '@antv/graphin';
import { Graph, GraphOptions } from '@antv/g6';
import { defaultOptions } from './defaults';
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
  options: GraphOptions;
  style?: React.CSSProperties;
  graph?: Graph | null;
  onReady?: (graph: Graph) => void;
}


export const CanvasGraph: React.FC<CanvasGraphProps> = (props) => {
  const options: GraphOptions = { ...defaultOptions, ...props.options }
  // const [graph, setGraph] = React.useState<Graph | null>(null);
  return (
    <>
      <div style={props?.style || {}}>
        <Graphin
          onReady={(graph) => {
            // setGraph(graph);
            if (props.onReady) {
              props.onReady(graph);
            }
          }}
          options={options}
        >
        </Graphin>
      </div>
    </>
  );
}
