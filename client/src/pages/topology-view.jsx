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

import ZeroTouchNode from "../components/custum-nodes/zeroTouchNode";
import ZeroTouchEdge from "../components/ZeroTouchEdge";

import "../components/custum-nodes/custum-node.scss";
import TopologyWrapper from "../assets/wrappers/topology-view-wrapper";
import DownloadButton from "../components/downloadImage";

const rfStyle = {
  backgroundColor: "#ffffff",
};

const initialNodes = [
  {
    id: "67108912",
    type: "ZeroTouchNode",
    position: {
      x: 91.54089883227236,
      y: 25.71320615630541,
    },
    data: {
      intf: ["Loopback1", "Ethernet0/1", "Ethernet0/0"],
      intfIP: ["10.0.0.1", "192.168.19.102", "192.160.0.2"],
      serial: "67108912",
      hostname: "R3",
      value: "10.0.0.1",
      img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
    },
  },
  {
    id: "67108896",
    type: "ZeroTouchNode",
    position: {
      x: 187.1585397506791,
      y: 213.71718654701414,
    },
    data: {
      intf: ["Ethernet0/0", "Ethernet0/1", "Loopback1"],
      intfIP: ["192.168.19.101", "192.160.0.1", "20.0.0.1"],
      serial: "67108896",
      hostname: "CiscoRouter",
      value: "192.168.19.101",
      img: "https://symbols.getvecta.com/stencil_240/204_router.7b208c1133.png",
    },
  },
];
const initialEdges = [
  {
    id: "10.0.0.1-255.255.255.255",
    source: "67108912",
    target: null,
    sourceHandle: "src-Loopback1-10.0.0.1",
    targetHandle: "tgt-None-255.255.255.255",
    type: "ZeroTouchEdge",
    data: {
      weight: 1,
      type: "stub network",
      srcIfName: "Loopback1",
      srcDevice: "67108912",
      tgtIfName: null,
      tgtDevice: null,
      srcIP: "10.0.0.1",
      tgtIP: "255.255.255.255",
    },
  },
  {
    id: "192.168.19.101-192.168.19.102",
    source: "67108896",
    target: "67108912",
    sourceHandle: "src-Ethernet0/0-192.168.19.101",
    targetHandle: "tgt-Ethernet0/1-192.168.19.102",
    type: "ZeroTouchEdge",
    data: {
      weight: 10,
      type: "transit network",
      srcIfName: "Ethernet0/0",
      srcDevice: "67108896",
      tgtIfName: "Ethernet0/1",
      tgtDevice: "67108912",
      srcIP: "192.168.19.101",
      tgtIP: "192.168.19.102",
    },
  },
  {
    id: "192.168.19.101-192.168.19.101",
    source: "67108896",
    target: "67108896",
    sourceHandle: "src-Ethernet0/0-192.168.19.101",
    targetHandle: "tgt-Ethernet0/0-192.168.19.101",
    type: "ZeroTouchEdge",
    data: {
      weight: 10,
      type: "transit network",
      srcIfName: "Ethernet0/0",
      srcDevice: "67108896",
      tgtIfName: "Ethernet0/0",
      tgtDevice: "67108896",
      srcIP: "192.168.19.101",
      tgtIP: "192.168.19.101",
    },
  },
  {
    id: "192.160.0.1-192.160.0.2",
    source: "67108896",
    target: "67108912",
    sourceHandle: "src-Ethernet0/1-192.160.0.1",
    targetHandle: "tgt-Ethernet0/0-192.160.0.2",
    type: "ZeroTouchEdge",
    data: {
      weight: 10,
      type: "transit network",
      srcIfName: "Ethernet0/1",
      srcDevice: "67108896",
      tgtIfName: "Ethernet0/0",
      tgtDevice: "67108912",
      srcIP: "192.160.0.1",
      tgtIP: "192.160.0.2",
    },
  },
  {
    id: "192.160.0.1-192.160.0.1",
    source: "67108896",
    target: "67108896",
    sourceHandle: "src-Ethernet0/1-192.160.0.1",
    targetHandle: "tgt-Ethernet0/1-192.160.0.1",
    type: "ZeroTouchEdge",
    data: {
      weight: 10,
      type: "transit network",
      srcIfName: "Ethernet0/1",
      srcDevice: "67108896",
      tgtIfName: "Ethernet0/1",
      tgtDevice: "67108896",
      srcIP: "192.160.0.1",
      tgtIP: "192.160.0.1",
    },
  },
  {
    id: "20.0.0.1-255.255.255.255",
    source: "67108896",
    target: null,
    sourceHandle: "src-Loopback1-20.0.0.1",
    targetHandle: "tgt-None-255.255.255.255",
    type: "ZeroTouchEdge",
    data: {
      weight: 1,
      type: "stub network",
      srcIfName: "Loopback1",
      srcDevice: "67108896",
      tgtIfName: null,
      tgtDevice: null,
      srcIP: "20.0.0.1",
      tgtIP: "255.255.255.255",
    },
  },
];
const nodeTypes = { ZeroTouchNode: ZeroTouchNode };
const edgeTypes = { ZeroTouchEdge: ZeroTouchEdge };

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
    <TopologyWrapper>
      <div className="wrapper" id="download-image" style={{ height: 800 }}>
        <DownloadButton />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          // connectionLineStyle={connectionLineStyle}
          // connectionLineType="smoothstep"
          fitView
          style={rfStyle}
          // attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>
    </TopologyWrapper>
  );
}

export default TopologyView;
