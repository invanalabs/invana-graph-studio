import React, { useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  Controls,
  Panel,
  ColorMode,
} from "@xyflow/react";
import { FlowCanvasOptions } from "./types";
import '@xyflow/react/dist/style.css';
import { defaultFlowCanvasOptions } from "./defaults";
import { addNodeDefaults } from "./utils";
import "../index.css";
import { CanvasToolBar } from "@/plugins/toolbars/CanvasToolBar";
import { Moon, Sun } from "lucide-react";
import { ButtonWithTooltip } from "@invana/ui/components/ui-extended/button-with-tooltip";


const FlowCanvas: React.FC<FlowCanvasOptions> = (options) => {
  options = { ...defaultFlowCanvasOptions, ...options };
  const ref = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(options.nodes.map(
    node => addNodeDefaults(node, options.canvas.defaultNodeOptions || {}, options.layoutDirection)
  ));
  const [edges, setEdges, onEdgesChange] = useEdgesState(options?.edges || []);


  const [theme, setTheme] = React.useState<ColorMode>(options.canvas.colorMode || 'system');

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
          {options.display?.plugins?.miniMap && <MiniMap zoomable pannable />}
          {options.display?.plugins?.background && <Background {...options.background} />}
          {/* {options.display?.plugins?.controls && <Controls />} */}
          {/* {options.display?.plugins?.devTools && <DevTools position="top-left" className="p-0 border rounded shadow-sm" />} */}
          <Panel position="top-left" className="bg-secondary dark:bg-neutral-800 dark:text-card-foreground
           border border-neutral-300 dark:border-neutral-700 flex items-center transition-colors
           flex items-center"> <CanvasToolBar />
          </Panel>

          <Panel position="top-right" className="bg-secondary dark:bg-neutral-800 dark:text-card-foreground
           border border-neutral-300 dark:border-neutral-700 flex items-center transition-colors">
            <ButtonWithTooltip
              variant="ghost"
              size="icon-sm"
              onClick={() => toggleTheme()}
              tooltip={<p>Toggle Theme</p>}
            >
              {getActiveTheme() === 'light' ? <Sun className="h-4 w-4" /> :
                <Moon className="h-4 w-4" />}
            </ButtonWithTooltip>

          </Panel>

          {options.children}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};


export default FlowCanvas;
