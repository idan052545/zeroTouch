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
  {
    id: "node-1",
    type: "ZeroTouchNode",
    position: { x: 0, y: 0 },
    data: {
      value: 123,
      img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
    },
  },
  {
    id: "node-2",
    type: "ZeroTouchNode",
    position: { x: 0, y: 50 },
    data: {
      value: 123,
      img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
    },
  },
];

const initialEdges = [{ id: "1-2", source: "node-1", target: "node-2" }];

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
