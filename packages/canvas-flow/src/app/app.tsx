import React, { useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  ColorMode
} from "@xyflow/react";
import { FlowCanvasOptions } from "./types";
import '@xyflow/react/dist/style.css';
import { defaultFlowCanvasOptions } from "./defaults";
import { addNodeDefaults } from "./utils";
import "../index.css";
import { CanvasToolBar } from "../plugins/toolbars/CanvasToolBar";
import { Moon, Sun } from "lucide-react";
import { ButtonWithTooltip } from "@invana/ui";
import { DevTools } from "../plugins/toolbars/DevTools";



export const CanvasFlow: React.FC<FlowCanvasOptions> = (options) => {
  options = { ...defaultFlowCanvasOptions, ...options };
  const ref = useRef<HTMLDivElement>(null);

  const defaultNodes = options.nodes.map(
    node => addNodeDefaults(node, options.canvas?.defaultNodeOptions || {}, options.layoutDirection)
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, _setNodes, onNodesChange] = useNodesState(defaultNodes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [edges, _setEdges, onEdgesChange] = useEdgesState(options?.edges || []);

  const [theme, setTheme] = React.useState<ColorMode>(options.canvas?.colorMode || 'system');

  const getActiveTheme = () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = theme === 'system' ? systemTheme : theme;
    return activeTheme
  }

  const toggleTheme = () => {
    const newTheme = getActiveTheme() === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  console.log("theme", theme);

  return (
    <div style={options.style}>
      <ReactFlowProvider fitView>
        <ReactFlow
          ref={ref}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodes={nodes}
          edges={edges}
          colorMode={theme}
          {...(options.canvas ? Object.fromEntries(
            Object.entries(options.canvas).filter(([key]) => key !== 'defaultNodeOptions' && key !== 'colorMode')
          ) : {})}
        >
          {options.display?.plugins?.miniMap && <MiniMap zoomable pannable position="bottom-left" />}
          {options.display?.plugins?.background && <Background {...options.background} />}
          {options.display?.plugins?.devTools &&
            <DevTools position="bottom-right" className=" border rounded shadow-sm" />
          }

          {options.display?.plugins?.controls &&
            <Panel position="top-left" className="transition-colors flex items-center border shadow-sm
              bg-card text-card-foreground ">
              <CanvasToolBar />
            </Panel>
          }

          {options.display?.plugins?.theme &&
            <Panel position="top-right" className=" bg-card text-card-foreground border  flex items-center transition-colors">
              <ButtonWithTooltip
                variant="ghost"
                size="icon-sm"
                onClick={() => toggleTheme()}
                className="rounded-none"
                tooltip={<p>Toggle Theme</p>}
              >
                {
                  getActiveTheme() === 'light'
                    ? <Sun className="h-4 w-4" />
                    : <Moon className="h-4 w-4" />
                }
              </ButtonWithTooltip>
            </Panel>
          }

          {options.children}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};


