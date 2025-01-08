// import React, { createContext, useContext, useEffect, useState } from "react";
// import Graphin, { GraphinContext } from "@antv/graphin";

// // Create the GraphProvider context
// const GraphProviderContext = createContext<{ graph: GraphinContex["graph"] | null }>({ graph: null });

// // Custom hook for consuming the graph instance
// export const useGraph = () => {
//   return useContext(GraphProviderContext);
// };

// // GraphProvider component
// export const GraphProvider: React.FC<{ data: any; layout: any; children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [graph, setGraph] = useState<GraphinContext["graph"] | null>(null);

//   return (
//     <Graphin>
//       <GraphinContext.Consumer>
//         {({ graph }) => {
//           useEffect(() => {
//             if (graph) {
//               setGraph(graph);
//             }
//           }, [graph]);
//           return (
//             <GraphProviderContext.Provider value={{ graph }}>
//               {children}
//             </GraphProviderContext.Provider>
//           );
//         }}
//       </GraphinContext.Consumer>
//     </Graphin>
//   );
// };
