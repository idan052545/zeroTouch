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
