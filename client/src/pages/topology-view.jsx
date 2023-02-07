import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GiPathDistance } from "react-icons/gi";
import { MdBackup, MdCompareArrows } from "react-icons/md";
import { RiFocus2Fill, RiShutDownFill } from "react-icons/ri";
import { TbShapeOff } from "react-icons/tb";

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
import SideButton from "../components/side-button/side-button";
import {
  selectFuncResult,
  selectIsTopologyLoaded,
  selectTopology,
} from "../redux/router/router-selectors";
import {
  getShortestPathStart,
  getTopologyStart,
} from "../redux/router/router-actions";
import {
  SpinnerContainer,
  SpinnerOverlay,
} from "../components/withSpinner/sWithSpinner";
const rfStyle = {
  backgroundColor: "#ffffff",
  zIndex: "-1",
};

const nodeTypes = { ZeroTouchNode: ZeroTouchNode };
const edgeTypes = { ZeroTouchEdge: ZeroTouchEdge };

function TopologyView() {
  const dispatch = useDispatch();
  let topology = useSelector(selectTopology);
  const isTopologyLoaded = useSelector(selectIsTopologyLoaded);
  const isResultArrived = useSelector(selectFuncResult);

  const [showModal, setShowModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleShortestPathClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedSource(null);
    setSelectedDestination(null);
  };

  const handleSourceSelection = (e) => {
    setSelectedSource(e.target.value);
  };

  const handleDestinationSelection = (e) => {
    setSelectedDestination(e.target.value);
  };

  const handleCalculateClick = () => {
    console.log(
      "Calculating shortest path between:",
      selectedSource,
      selectedDestination
    );
    dispatch(getShortestPathStart(selectedSource, selectedDestination));

    handleModalClose();
  };

  useEffect(() => {
    dispatch(getTopologyStart());
  }, [dispatch]);

  useEffect(() => {
    console.log(isResultArrived);
  }, [isResultArrived]);

  useEffect(() => {
    if (isTopologyLoaded) {
      setNodes(topology.nodes);
      setEdges(topology.edges);
    }
  }, [isTopologyLoaded, topology]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

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
      {isTopologyLoaded ? (
        <div className="wrapper" id="download-image" style={{ height: 800 }}>
          <DownloadButton />
          <div className="sidebar">
            <SideButton
              icon={<GiPathDistance />}
              onClick={handleShortestPathClick}
            >
              Shortest Paths
            </SideButton>
            <SideButton icon={<MdBackup />}>Discover Backup Paths</SideButton>
            <SideButton icon={<RiShutDownFill />}>Router Shutdown</SideButton>
            <SideButton icon={<RiFocus2Fill />}>Focus on Node</SideButton>
            <SideButton icon={<MdCompareArrows />}>Compare State</SideButton>
            <SideButton icon={<TbShapeOff />}>Asymmetric Paths</SideButton>
          </div>

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
            <Controls position="top-right" />
            <MiniMap />
            <Background />
          </ReactFlow>
        </div>
      ) : (
        <SpinnerOverlay>
          <SpinnerContainer />
        </SpinnerOverlay>
      )}
      <div className="app-calculator-container">
        {showModal && (
          <div className="app-modal">
            <div className="app-modal-content">
              <span onClick={handleModalClose} className="app-modal-close-btn">
                &times;
              </span>
              <div className="app-dropdown-container">
                <label htmlFor="source">Source:</label>
                <select
                  id="source"
                  onChange={handleSourceSelection}
                  value={selectedSource || ""}
                >
                  <option value="">Select a node</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.data["hostname"]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="app-dropdown-container">
                <label htmlFor="destination">Destination:</label>
                <select
                  id="destination"
                  onChange={handleDestinationSelection}
                  value={selectedDestination || ""}
                >
                  <option value="">Select a node</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.data["hostname"]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleCalculateClick}
                disabled={
                  selectedSource === null || selectedDestination === null
                }
                className="app-calculate-btn"
              >
                Calculate
              </button>
              <p></p>
            </div>
          </div>
        )}
      </div>
    </TopologyWrapper>
  );
}

export default TopologyView;
