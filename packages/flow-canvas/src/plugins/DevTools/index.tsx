import React, {
  useState,
} from 'react';
import {
  Panel
} from '@xyflow/react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@invana/ui/components/ui/toggle-group"
import { ChangeLogger } from "./ChangeLogger"
import { ViewportLogger } from './ViewportLogger';
import { NodeInspector } from './NodeInspector';



export function DevTools(): React.ReactNode {
  const [nodeInspectorActive, setNodeInspectorActive] = useState(false);
  const [changeLoggerActive, setChangeLoggerActive] = useState(false);
  const [viewportLoggerActive, setViewportLoggerActive] = useState(false);

  const tools = [
    { active: nodeInspectorActive, setActive: setNodeInspectorActive, label: 'Node Inspector', value: 'node-inspector' },
    { active: changeLoggerActive, setActive: setChangeLoggerActive, label: 'Change Logger', value: 'change-logger' },
    { active: viewportLoggerActive, setActive: setViewportLoggerActive, label: 'Viewport Logger', value: 'viewport-logger' },
  ];

  return (
    <div>
      <Panel position="top-left" className="p-0 border rounded shadow-sm">
        <ToggleGroup type="multiple">
          {tools.map(({ active, setActive, label, value }) => (
            <ToggleGroupItem
              key={value}
              value={value}
              onClick={() => setActive((prev) => !prev)}
              aria-pressed={active}
              className=" text-card-foreground transition-colors !h-6 !p-2 !rounded-none
              duration-300 hover:bg-secondary hover:text-secondary-foreground"
            >
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Panel>

      {changeLoggerActive && (
        <Panel className="text-xs p-5 bg-white rounded shadow-md overflow-y-auto w-[320px] max-h-[50%] mt-20" position="bottom-right">
          <ChangeLogger />
        </Panel>
      )}

      {nodeInspectorActive && <NodeInspector />}

      {viewportLoggerActive && (
        <Panel position="bottom-left" className="text-secondary-foreground">
          <ViewportLogger />
        </Panel>
      )}
    </div>
  );
}

DevTools.displayName = "DevTools";
