import React from 'react';
import { Graphin } from '@antv/graphin';
import { GraphOptions } from '@antv/g6';
import { defaultOptions } from './defaults';
import { ZoomControls } from '../plugins/';


export const CanvasGraph: React.FC = (props) => {
  const options: GraphOptions = { ...defaultOptions, ...props }

  return (
    <Graphin
      style={{ width: 'calc(100% - 2px)', height: 'calc(100vh )' }}
      options={options}
    >
      <ZoomControls />
    </Graphin>
  );
}
