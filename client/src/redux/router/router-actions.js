import RouterActionTypes from "./router-types";

export const getTopologySuccess = (topology) => ({
  type: RouterActionTypes.GET_TOPOLOGY_SUCCESS,
  payload: topology,
});

export const getTopologyFailure = (error) => ({
  type: RouterActionTypes.GET_TOPOLOGY_FAILURE,
  payload: error,
});

export const getTopologyStart = (ipList) => ({
  type: RouterActionTypes.GET_TOPOLOGY_START,
  payload: ipList,
});

export const sendCommandSuccess = (result) => ({
  type: RouterActionTypes.SEND_COMMAND_SUCCESS,
  payload: result,
});

export const sendCommandFailure = (error) => ({
  type: RouterActionTypes.SEND_COMMAND_FAILURE,
  payload: error,
});

export const sendCommandStart = (ip, command) => ({
  type: RouterActionTypes.SEND_COMMAND_START,
  payload: { ip, command },
});

export const sendOspfConfigSuccess = (result) => ({
  type: RouterActionTypes.SEND_OSPF_CONFIG_SUCCESS,
  payload: result,
});

export const sendOspfConfigFailure = (error) => ({
  type: RouterActionTypes.SEND_OSPF_CONFIG_FAILURE,
  payload: error,
});

export const sendOspfConfigStart = (config) => ({
  type: RouterActionTypes.SEND_OSPF_CONFIG_START,
  payload: config,
});

export const compareStateSuccess = (result) => ({
  type: RouterActionTypes.COMPARE_STATE_SUCCESS,
  payload: result,
});

export const compareStateFailure = (error) => ({
  type: RouterActionTypes.COMPARE_STATE_FAILURE,
  payload: error,
});

export const compareStateStart = (currentTopology) => ({
  type: RouterActionTypes.COMPARE_STATE_START,
  payload: currentTopology,
});

export const getShortestPathStart = (source, target) => ({
  type: RouterActionTypes.GET_SHORTEST_PATH_START,
  payload: { source, target },
});

export const getShortestPathSuccess = (result) => ({
  type: RouterActionTypes.GET_SHORTEST_PATH_SUCCESS,
  payload: result,
});

export const getShortestPathFailure = (error) => ({
  type: RouterActionTypes.GET_SHORTEST_PATH_FAILURE,
  payload: error,
});

export const getBackupPathStart = (srcIPEdge, tatIPEdge) => ({
  type: RouterActionTypes.GET_BACKUP_PATH_START,
  payload: { srcIPEdge, tatIPEdge },
});

export const getBackupPathSuccess = (result) => ({
  type: RouterActionTypes.GET_BACKUP_PATH_SUCCESS,
  payload: result,
});

export const getBackupPathFailure = (error) => ({
  type: RouterActionTypes.GET_BACKUP_PATH_FAILURE,
  payload: error,
});

export const routerShutdownStart = (shutRouter) => ({
  type: RouterActionTypes.ROUTER_SHUTDOWN_START,
  payload: shutRouter,
});

export const routerShutdownSuccess = (result) => ({
  type: RouterActionTypes.ROUTER_SHUTDOWN_SUCCESS,
  payload: result,
});

export const routerShutdownFailure = (error) => ({
  type: RouterActionTypes.ROUTER_SHUTDOWN_FAILURE,
  payload: error,
});

export const getAsymmetricPathStart = () => ({
  type: RouterActionTypes.GET_ASYMMETRIC_PATH_START,
});

export const getAsymmetricPathSuccess = (result) => ({
  type: RouterActionTypes.GET_ASYMMETRIC_PATH_SUCCESS,
  payload: result,
});

export const getAsymmetricPathFailure = (error) => ({
  type: RouterActionTypes.GET_ASYMMETRIC_PATH_FAILURE,
  payload: error,
});
