import React from 'react';
import { LogoComponent, sideBarBottomNavitems, sideBarTopNavitems } from '../constants';
import { ProductCopyRightInfo, ProductName } from '@/constants';
import {
  BlankLayout
} from '@invana/ui';
import { ReactFlowProvider } from '@invana/canvas-flow';
import { AppHeader, AppFooter, AppMain } from '@invana/ui/themes/app'
// import useTheme from '@invana/ui/hooks/useTheme';
import AppHeaderRight from '@/ui/header/app-header-right';
import { CanvasGraph, CanvasToolBar, defaultOptions, GraphManager } from '@invana/canvas-graph';
import { lesMiserablesData } from '@invana/example-datasets'
// import '@invana/canvas-graph/dist/index.css'


const ExplorerPage: React.FC = () => {

  // const { theme } = useTheme();
  // const [data, setData] = React.useState({ nodes: [], edges: [] });
  // const [graphManager, setGraphManager] = React.useState<GraphManager | null>(null);
  // const initGraphManager = React.useCallback((manager: GraphManager) => {
  //   setGraphManager(manager);
  // }, []);

  const graphManager = new GraphManager(null);

  // const [graph, setGraph] = React.useState<Graph>(null);

  // React.useEffect(() => {
  //   runQuery()
  // }, []);

  // const runQuery = () => {
  //   const randInt = Math.floor(Math.random() * 10) + 1;

  //   fetchGraphQLData(`g.V().limit(${randInt}).toList()`).then(d => {
  //     const response = serializeToGraph(d.data);
  //     console.log("response", response);
  //     setData(response);
  //   });

  // }

  // console.log("===data2", data)

  const options = { ...defaultOptions, data: lesMiserablesData }

  return (
    <BlankLayout
      logo={LogoComponent}
      sideBarBottomNavitems={sideBarBottomNavitems}
      sideBarTopNavitems={sideBarTopNavitems}
    >

      <ReactFlowProvider fitView>
        <AppHeader
          left={
            <>
              {/* <Compass className='h-4 w-4' /> */}
              <span className='font-bold mr-2'>{ProductName}</span>
              <span className='mr-2'>|</span>
              <span>Explorer</span>
            </>
          }
          center={
            graphManager && <CanvasToolBar graph={graphManager.graph} />
          }
          right={
            <AppHeaderRight />
          }
        >
        </AppHeader>

        <AppMain>
          <CanvasGraph style={{ width: "100%", height: "100%" }} graphManager={graphManager}
            // onReady={setGraph}
            options={options} />
        </AppMain>

        <AppFooter
          right={ProductCopyRightInfo}
        >

        </AppFooter>
      </ReactFlowProvider>
    </BlankLayout >
  );
};

export default ExplorerPage;