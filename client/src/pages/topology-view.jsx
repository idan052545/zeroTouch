import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import ZeroTouchNode from "../components/custum-nodes/custum-node";

import "../components/custum-nodes/custum-node.scss";

const rfStyle = {
  backgroundColor: "#ffffff",
};

const initialNodes = [
  // {
  //   id: "node-1",
  //   type: "ZeroTouchNode",
  //   position: { x: -4.6911228725903635, y: -9.919504481732364 },
  //   data: {
  //     value: 123,
  //     img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
  //   },
  // },
  // {
  //   id: "node-2",
  //   type: "ZeroTouchNode",
  //   position: { x: 65.20932100627898, y: 100.0 },
  //   data: {
  //     value: 123,
  //     img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
  //   },
  // },
  {
    id: "node-1",
    type: "ZeroTouchNode",
    position: {
      x: -4.6911228725903635,
      y: -9.919504481732364,
    },
    data: {
      value: 123,
      img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
    },
  },
  {
    id: "node-2",
    type: "ZeroTouchNode",
    position: {
      x: 65.20932100627898,
      y: 100.0,
    },
    data: {
      value: 123,
      img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
    },
  },
  {
    id: "node-3",
    type: "ZeroTouchNode",
    position: {
      x: 1.1244568049374297,
      y: -0.7537954550501272,
    },
    data: {
      value: 123,
      img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
    },
  },
  {
    id: "node-4",
    type: "ZeroTouchNode",
    position: {
      x: -68.29322280210454,
      y: -97.91766004371908,
    },
    data: {
      value: 123,
      img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
    },
  },
  {
    id: "node-5",
    type: "ZeroTouchNode",
    position: {
      x: 6.650567863478483,
      y: 8.590959980501555,
    },
    data: {
      value: 123,
      img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
    },
  },
];

const initialEdges = [{ id: "1-2", source: "node-1", target: "node-2" }];

// {'10.0.0.1': {'x': -4.6911228725903635, 'y': -9.919504481732364}, '192.160.1.1': {'x': 65.20932100627898, 'y': 100.0}, '255.255.255.255': {'x': 1.1244568049374297, 'y': -0.7537954550501272}, '192.160.1.2': {'x': -68.29322280210454, 'y': -97.91766004371908}, '20.0.0.1': {'x': 6.650567863478483, 'y': 8.590959980501555}}
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { ZeroTouchNode: ZeroTouchNode };

function TopologyView() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    >
      <Controls />
      <MiniMap />
      <Background />
    </ReactFlow>
  );
}

export default TopologyView;
