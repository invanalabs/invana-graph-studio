import { Compass } from 'lucide-react';
import React from 'react';
import { CanvasFlow, CanvasToolBar, defaultFlowCanvasOptions } from '@invana/canvas-flow';
import { LogoComponent, sideBarBottomNavitems, sideBarTopNavitems } from '../constants';
import { ProductInfo } from '@/constants';
import {
  BlankLayout
} from '@invana/ui';
import { ReactFlowProvider } from '@invana/canvas-flow';
// import { data } from './dummy-data'
import { AppHeader, AppFooter, AppMain } from '@invana/ui/themes/app'
import useTheme from '@invana/ui/hooks/useTheme';
import AppHeaderRight from '@/ui/header/app-header-right';
import { fetchGraphQLData } from '@/services/runQueryService';
import { serializeToGraph } from '@/services/serializer.utils';


const ExplorerPage: React.FC = () => {

  const { theme } = useTheme();
  const [data, setData] = React.useState({ nodes: [], edges: [] });

  React.useEffect(() => {
    runQuery()
  }, []);

  const runQuery = () => {
    const randInt = Math.floor(Math.random() * 10) + 1;

    fetchGraphQLData(`g.V().limit(${randInt}).toList()`).then(d => {
      const response = serializeToGraph(d.data);
      console.log("response", response);
      setData(response);
    });

  }

  console.log("===data2", data)

  return (
    <BlankLayout
      logo={LogoComponent}
      sideBarBottomNavitems={sideBarBottomNavitems}
      sideBarTopNavitems={sideBarTopNavitems}
    >

      <ReactFlowProvider fitView>
        <AppHeader
          left={
            <><Compass className='h-4 w-4' /> <span className='font-bold'>Invana | Explorer</span></>
          }
          center={
            <CanvasToolBar />
          }
          right={
            <AppHeaderRight />
          }
        >
        </AppHeader>

        <AppMain>
          {data.nodes.length > 0 ?
            <CanvasFlow nodes={data ? data.nodes : []} edges={data ? data.edges : []}
              style={{ width: '100%', height: '100%' }}
              canvas={{ ...defaultFlowCanvasOptions.canvas, colorMode: theme }}
              display={{
                plugins: {
                  devTools: false,
                  miniMap: true,
                  controls: false,
                  background: true,
                  theme: true
                }
              }}
            />
            : <></>}
        </AppMain>

        <AppFooter
          right={ProductInfo}
        >

        </AppFooter>
      </ReactFlowProvider>
    </BlankLayout >
  );
};

export default ExplorerPage;