import { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GiPathDistance } from "react-icons/gi";
import { MdBackup, MdCompareArrows } from "react-icons/md";
import { RiFocus2Fill, RiShutDownFill } from "react-icons/ri";
import { TbShapeOff } from "react-icons/tb";
import { toast } from "react-toastify";

import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  Background,
  useReactFlow,
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
  selectIsFetching,
  selectIsTopologyLoaded,
  selectTopology,
} from "../redux/router/router-selectors";
import {
  compareStateStart,
  getAsymmetricPathStart,
  getBackupPathStart,
  getShortestPathStart,
  getTopologyStart,
  routerShutdownStart,
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
  const resultArrived = useSelector(selectFuncResult);
  const isFetching = useSelector(selectIsFetching);
  const reactFlow = useReactFlow();
  const resultRef = useRef();

  const [showResult, setshowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [selectedEdge, setSelectedEdge] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const [showSelection, setShowSelection] = useState(false);
  const [showRouterSelection, setShowRouterSelection] = useState(false);

  const handleNodeClick = (event) => {
    const nodes = reactFlow.getNodes();

    // const clickX = event.clientX;
    // const clickY = event.clientY;

    // let closestNodeId = null;
    // let closestNodeDistance = Number.POSITIVE_INFINITY;

    // nodes.forEach((node) => {
    //   const nodeX = node.position.x + node.w / 2;
    //   const nodeY = node.position.y + node.h / 2;

    //   const distance = Math.sqrt(
    //     Math.pow(clickX - nodeX, 2) + Math.pow(clickY - nodeY, 2)
    //   );
    //   if (distance < closestNodeDistance) {
    //     closestNodeId = node.id;
    //     closestNodeDistance = distance;
    //   }
    // });

    // let nodeData = topology.nodes.find((node) => node.id === closestNodeId);
    // console.log(closestNodeId);
    const nodeData = nodes.filter((node) => node.selected)[0];

    if (!showRouterSelection) {
      toast.info(` ${nodeData.data.hostname} נבחר הראוטר  `);
    } else {
      toast.info(`${nodeData.data.hostname} נכבה הראוטר  `);
      removeNode(nodeData.id);
      setShowRouterSelection(false);
      dispatch(routerShutdownStart(nodeData.id));
      setSelectedNode(null);
    }
  };

  const handleEdgeClick = (edge) => {
    setSelectedEdge(edge);

    let edgeData = topology.edges.find(
      (edge) => edge.id === selectedEdge.target.id
    );
    if (!showSelection) {
      toast.info(
        `בחרת את החיבור שהמקור שלו הוא ${edgeData.data.srcIP} והיעד שלו ${edgeData.data.tgtIP}`
      );
    } else {
      toast.info(
        `בחרת את החיבור שהמקור שלו הוא ${edgeData.data.srcIP} והיעד שלו החיבור הוסר ${edgeData.data.tgtIP}`
      );
      removeEdge(selectedEdge.target.id);
      setShowSelection(false);
      dispatch(getBackupPathStart(edgeData.data.srcIP, edgeData.data.tgtIP));
      setSelectedEdge(null);
    }
  };

  const handleRouterShutdownClick = () => {
    toast.info("בחר ראוטר להסרה");
    setShowRouterSelection(true);
  };

  const handleBackupPathsClick = () => {
    toast.info("בחר חיבור להסרה");
    setShowSelection(true);
  };
  const handleShortestPathClick = () => {
    setShowModal(true);
  };

  const handleAsymmetricPathsClick = (e) => {
    dispatch(getAsymmetricPathStart());
  };

  const handleCompareStateClick = (e) => {
    dispatch(compareStateStart(topology));
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
    dispatch(getShortestPathStart(selectedSource, selectedDestination));

    handleModalClose();
  };

  useEffect(() => {
    dispatch(getTopologyStart());
  }, [dispatch]);

  useEffect(() => {
    if (resultArrived && !isFetching) {
      setshowResult(true);

      console.log(resultRef.current);
      // resultRef.current.value = resultArrived;

      resetEdges(topology.edges);
      resetNodes(topology.nodes);
    }
    console.log(resultArrived);
  }, [resultArrived, isFetching]);

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
  const removeEdge = useCallback(
    (edgeID) => setEdges((eds) => eds.filter((ed) => ed.id !== edgeID)),
    []
  );

  const removeNode = useCallback(
    (nodeID) => setNodes((nds) => nds.filter((nd) => nd.id !== nodeID)),
    []
  );

  const resetEdges = useCallback((changes) => setEdges(changes), []);
  const resetNodes = useCallback((changes) => setNodes(changes), []);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const selectedEdgeStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px grey",
  };

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
            <SideButton onClick={handleBackupPathsClick} icon={<MdBackup />}>
              Discover Backup Paths
            </SideButton>
            <SideButton
              onClick={handleRouterShutdownClick}
              icon={<RiShutDownFill />}
            >
              Router Shutdown
            </SideButton>
            <SideButton icon={<RiFocus2Fill />}>Focus on Node</SideButton>
            <SideButton
              onClick={handleCompareStateClick}
              icon={<MdCompareArrows />}
            >
              Compare State
            </SideButton>
            <SideButton
              onClick={handleAsymmetricPathsClick}
              icon={<TbShapeOff />}
            >
              Asymmetric Paths
            </SideButton>
          </div>
          <ReactFlow
            onEdgeClick={handleEdgeClick}
            onNodeClick={handleNodeClick}
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
                <label htmlFor="source">מקור:</label>
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
                <label htmlFor="destination">יעד:</label>
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
                מצא מסלול קצר
              </button>
              <p></p>
            </div>
          </div>
        )}
      </div>

      {showResult && (
        <div className="result-modal-overlay">
          <div className="result-modal">
            <h2 className="result-title">תוצאה</h2>
            <p className="result-text"> {resultArrived} </p>
            <button
              className="result-close-btn"
              onClick={() => setshowResult(false)}
            >
              סגור
            </button>
            <button
              className="app-copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(resultArrived);
                toast.info("הטקסט הועתק אל לוח הכתיבה");
              }}
            >
              העתק ללוח{" "}
            </button>
          </div>
        </div>
      )}
    </TopologyWrapper>
  );
}

export default TopologyView;
