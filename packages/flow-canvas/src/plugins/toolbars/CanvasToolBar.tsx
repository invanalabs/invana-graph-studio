import React from 'react';
import { ViewportControls } from '../options/ViewportControls/ViewportControls';
import { CanvasControls } from '../options/CanvasControls/CanvasControls';


export const CanvasToolBar: React.FC = () => {

  return (
    <>
      <ViewportControls />
      <CanvasControls />
    </>
  );
};
