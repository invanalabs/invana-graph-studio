import { Compass } from 'lucide-react';
import React from 'react';
import { LogoComponent, sideBarBottomNavitems, sideBarTopNavitems } from '../constants';
import { ProductCopyRightInfo, ProductName } from '@/constants';
import {
  BlankLayout
} from '@invana/ui';
import { ReactFlowProvider } from '@invana/canvas-flow';
import { data } from './dummy-data'
import { AppHeader, AppFooter, AppMain } from '@invana/ui/themes/app'
import useTheme from '@invana/ui/hooks/useTheme';
import AppHeaderRight from '@/ui/header/app-header-right';
import { fetchGraphQLData } from '@/services/runQueryService';
import { serializeToGraph } from '@/services/serializer.utils';
import { CanvasGraph, CanvasToolBar, defaultOptions } from '@invana/canvas-graph';
import { Graph } from '@antv/g6';
import { flightData } from '@invana/example-datasets'
// import '@invana/canvas-graph/dist/index.css'


const ExplorerPage: React.FC = () => {

  const { theme } = useTheme();
  const [data, setData] = React.useState({ nodes: [], edges: [] });
  const [graph, setGraph] = React.useState<Graph | null>(null);

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

  console.log("===data2", data)

  const options = { ...defaultOptions, data: flightData }

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
            graph && <CanvasToolBar graph={graph} />
          }
          right={
            <AppHeaderRight />
          }
        >
        </AppHeader>

        <AppMain>
          <CanvasGraph style={{ width: "100%", height: "100%" }} onReady={setGraph} options={options} />
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