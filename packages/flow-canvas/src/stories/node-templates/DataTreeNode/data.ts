export const data = {
  nodes: [{
    id: "2.1",
    type: "DataTreeNode",
    data: {
      label: "NSE Data (2.1)",
      searchable: true,
      children: [
        { label: "identifier", id: "identifier" },
        {
          label: "is_active", id: "is_active",
          children: [
            { label: "candle", id: "candle" },
            { label: "title", id: "title" },
            { label: "description", id: "description" },
            { label: "is_active", id: "is_active" }
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
      label: "Source1 - Candle Data (2.2)",
      searchable: true,
      children: [
        { label: "candle", id: "candle" },
        { label: "title", id: "title" },
        { label: "description", id: "description" },
        { label: "is_active", id: "is_active" }
      ]
    },
    position: { x: 100, y: 0 }
  }],
  edges: []
}
