import { DataTreeNodeProps } from "@invana/canvas-flow/templates/nodes/DataTreeNode";
import { Folder, File, Database } from 'lucide-react'
import React from "react";


// export const data: DataTreeNodeProps[] = [
//   {
//     id: '0',
//     label: "Root",
//     // style: { width: "200px" },
//     isExpanded: true,

//     icon: <Folder className="h-4 w-4 shrink-0 text-yellow-500" />,
//     children: [
//       {
//         id: "1",
//         label: "Root 1",
//         icon: <Folder className="h-4 w-4 shrink-0 text-yellow-500" />,
//         isExpanded: true,
//         children: [
//           {
//             id: "1-1",
//             label: "Child 1-1",
//             icon: <Folder className="h-4 w-4 shrink-0 text-yellow-500" />,
//             children: [
//               {
//                 id: "1-1-1",
//                 icon: <File className="h-4 w-4 shrink-0 text-gray-500" />,
//                 label: "Clickable Grandchild 1-1-1",
//                 onClick: (id, label) => alert(`Clicked id:${id}; label:${label}`)
//               },
//               { id: "1-1-2", icon: <File className="h-4 w-4 shrink-0 text-gray-500" />, label: "Grandchild 1-1-2" }
//             ]
//           },
//           { id: "1-2", icon: <File className="h-4 w-4 shrink-0 text-gray-500" />, label: "Child 1-2" }
//         ]
//       },
//       {
//         id: "2",
//         label: "Root 2",
//         icon: <Folder className="h-4 w-4 shrink-0 text-yellow-500" />,
//         children: [
//           { id: "2-1", icon: <File className="h-4 w-4 shrink-0 text-gray-500" />, label: "Child 2-1" },
//           { id: "2-2", icon: <File className="h-4 w-4 shrink-0 text-gray-500" />, label: "Child 2-2" }
//         ]
//       }
//     ]
//   }

// ]



export const data = {
  nodes: [{
    id: "2.1",
    type: "DataTreeNode",
    data: {
      headerTitle: "NSE Data (2.1)",
      headerDescription: "This comprehensive NSE dataset contains real-time market information.",
      icon: <Database className="h-4 w-4" />,
      searchable: true,
      children: [
        {
          label: "level-1.1",
          id: "level-1.1",
          icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
        },
        {
          label: "level-1.2",
          id: "level-1.2",
          icon: <Folder className="h-4 w-4 shrink-0 text-yellow-500" />,
          isExpanded: true,
          children: [
            {
              label: "level-2.1",
              id: "level-2.1",
              icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
            },
            {
              label: "level-2.2",
              id: "level-2.2",
              icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
            },
            {
              label: "level-2.3",
              id: "level-2.3",
              icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
            },
            {
              label: "level-2.4",
              id: "level-2.4",
              icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
            },

            {
              label: "level-2.5",
              id: "level-2.5",
              icon: <Folder className="h-4 w-4 shrink-0 text-yellow-500" />,
              children: [
                {
                  label: "level-3.1",
                  id: "level-3.1",
                  icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
                },
                {
                  label: "level-3.2",
                  id: "level-3.2",
                  icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
                },
                {
                  label: "level-3.3",
                  id: "level-3.3",
                  icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
                },
                {
                  label: "level-3.4",
                  id: "level-3.4",
                  icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
                }
              ]
            }
          ]
        }
      ]
    },
    position: { x: -300, y: 0 }
  },
  {
    id: "2.2",
    type: "DataTreeNode",
    data: {
      headerTitle: "Source1 - Candle Data (2.2)",
      searchable: true,
      children: [
        {
          label: "level-3.1",
          id: "level-3.1",
          icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
        },
        {
          label: "level-3.2",
          id: "level-3.2",
          icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
        },
        {
          label: "level-3.3",
          id: "level-3.3",
          icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
        },
        {
          label: "level-3.4",
          id: "level-3.4",
          icon: <File className="h-4 w-4 shrink-0 text-gray-500" />
        }
      ]
    },
    position: { x: 100, y: 0 }
  }],
  edges: []
}


