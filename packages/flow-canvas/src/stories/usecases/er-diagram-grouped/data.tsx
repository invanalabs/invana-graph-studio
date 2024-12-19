
export const data = {
  "nodes": [
    {
      id: "1",
      position: { x: 200, y: 100 },
      data: { label: "Group Node" },
      width: 480,
      height: 500,
      type: "LabeledGroupNode"
    },
    {
      "id": "1.1",
      "type": "DataTypeFieldsNode",
      "data": {
        "label": "MongoDB (1.1)",
        "fields": [
          {
            "label": "crawlerflow",
            "id": "crawlerflow"
          }
        ]
      },
      "style": {
        "width": "200px"
      },
      "position": {
        "x": -374.97885451264744,
        "y": 287.68869493757217
      },
      "measured": {
        "width": 200,
        "height": 71
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "1.2",
      "type": "DataTypeFieldsNode",
      "data": {
        "label": "FileStorage (1.2)",
        "fields": [
          {
            "label": "myfile.csv",
            "id": "myfile-csv",
            "data_type": "string"
          }
        ]
      },
      "style": {
        "width": "200px"
      },
      "position": {
        "x": -376.208293379902,
        "y": 88.51959844232988
      },
      "measured": {
        "width": 200,
        "height": 71
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "2.1",
      "type": "DataTypeFieldsNode",
      "data": {
        "label": "NSE Data (2.1)",
        "fields": [
          {
            "label": "identifier",
            "id": "identifier",
            "data_type": "string"
          },
          {
            "label": "is_active",
            "id": "is_active",
            "data_type": "string"
          }
        ]
      },
      "parentId": "1",
      "extent": "parent",
      "style": {
        "width": "200px"
      },
      "position": {
        "x": -50.406993557437914,
        "y": 331.948494158737
      },
      "measured": {
        "width": 200,
        "height": 104
      },
      "selected": true,
      "dragging": false
    },
    {
      "id": "2.2",
      "type": "DataTypeFieldsNode",
      "data": {
        "label": "Source1 - Candle Data (2.2)",
        "fields": [
          {
            "label": "candle",
            "id": "candle",
            "data_type": "string"
          },
          {
            "label": "title",
            "id": "title",
            "data_type": "string"
          },
          {
            "label": "description",
            "id": "description",
            "data_type": "string"
          },
          {
            "label": "is_active",
            "id": "is_active",
            "data_type": "bool"
          }
        ]
      },
      "parentId": "1",
      "extent": "parent",
      "style": {
        "width": "200px"
      },
      "position": {
        "x": -50.406993557437836,
        "y": 49.17755469018326
      },
      "measured": {
        "width": 200,
        "height": 170
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "3.1",
      "type": "DataTypeFieldsNode",
      "data": {
        "label": "Derived Data (3.1)",
        "fields": [
          {
            "label": "identifier",
            "id": "identifier",
            "data_type": "string"
          },
          {
            "label": "candle",
            "id": "candle",
            "data_type": "string"
          },
          {
            "label": "title",
            "id": "title",
            "data_type": "string"
          },
          {
            "label": "description",
            "id": "description",
            "data_type": "string"
          }
        ]
      },
      "style": {
        "width": "200px"
      },
      "position": {
        "x": 331.948494158737,
        "y": 179.49807461916893
      },
      "measured": {
        "width": 200,
        "height": 170
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "3.2",
      "type": "DataTypeFieldsNode",
      "data": {
        "label": "Derived Data (3.2)",
        "fields": [
          {
            "label": "identifier",
            "id": "identifier",
            "data_type": "string"
          },
          {
            "label": "analysed_field",
            "id": "analysed_field",
            "data_type": "integer"
          }
        ]
      },
      "style": {
        "width": "200px"
      },
      "position": {
        "x": 796.9580873611033,
        "y": 216.08262286679
      },
      "measured": {
        "width": 200,
        "height": 104
      },
      "selected": false,
      "dragging": false
    }
  ],
  "edges": [
    {
      "id": "e0-1",
      "source": "1.1",
      "sourceHandle": "crawlerflow",
      "target": "2.1",
      "targetHandle": "2.1",
      "animated": false,
      "type": "step",
      "markerEnd": {
        "type": "arrowclosed"
      },
      "style": {
        "opacity": 1,
        "stroke": "#ccc"
      },
      "hidden": false
    },
    {
      "id": "e0-2",
      "source": "1.2",
      "sourceHandle": "myfile-csv",
      "target": "2.2",
      "targetHandle": "2.2",
      "animated": false,
      "type": "step",
      "markerEnd": {
        "type": "arrowclosed"
      },
      "style": {
        "opacity": 1,
        "stroke": "#ccc"
      },
      "hidden": false
    },
    {
      "id": "e0-3",
      "source": "2.1",
      "sourceHandle": "identifier",
      "target": "3.1",
      "targetHandle": "identifier",
      "animated": false,
      "type": "step",
      "markerEnd": {
        "type": "arrowclosed"
      },
      "style": {
        "opacity": 1,
        "stroke": "#ccc"
      },
      "hidden": false
    },
    {
      "id": "e0-4",
      "source": "2.2",
      "sourceHandle": "candle",
      "target": "3.1",
      "targetHandle": "candle",
      "animated": false,
      "type": "step",
      "markerEnd": {
        "type": "arrowclosed"
      },
      "style": {
        "opacity": 1,
        "stroke": "#ccc"
      },
      "hidden": false
    },
    {
      "id": "e0-5",
      "source": "2.2",
      "sourceHandle": "title",
      "target": "3.1",
      "targetHandle": "title",
      "animated": false,
      "type": "step",
      "markerEnd": {
        "type": "arrowclosed"
      },
      "style": {
        "opacity": 1,
        "stroke": "#ccc"
      },
      "hidden": false
    },
    {
      "id": "e0-6",
      "source": "3.1",
      "sourceHandle": "identifier",
      "target": "3.2",
      "targetHandle": "identifier",
      "animated": false,
      "type": "step",
      "markerEnd": {
        "type": "arrowclosed"
      },
      "style": {
        "opacity": 1,
        "stroke": "#ccc"
      },
      "hidden": false
    },
    {
      "id": "e0-7",
      "source": "3.1",
      "sourceHandle": "description",
      "target": "3.2",
      "targetHandle": "analysed_field",
      "animated": false,
      "type": "step",
      "markerEnd": {
        "type": "arrowclosed"
      },
      "style": {
        "opacity": 1,
        "stroke": "#ccc"
      },
      "hidden": false
    }
  ],
  "viewport": {
    "x": 413.7305422421646,
    "y": 210.08971667578632,
    "zoom": 0.8133791981321252
  }
}