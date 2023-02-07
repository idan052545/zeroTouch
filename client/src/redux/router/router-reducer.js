import RouterActionTypes from "./router-types";

const INITIAL_STATE = {
  topology: null,
  command_result: null,
  topology_func_result: null,
  isFetching: false,
  error: null,
};

const routerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RouterActionTypes.GET_TOPOLOGY_START:
    case RouterActionTypes.SEND_COMMAND_START:
    case RouterActionTypes.SEND_OSPF_CONFIG_START:
    case RouterActionTypes.COMPARE_STATE_START:
    case RouterActionTypes.GET_BACKUP_PATH_START:
    case RouterActionTypes.ROUTER_SHUTDOWN_START:
    case RouterActionTypes.GET_SHORTEST_PATH_START:
    case RouterActionTypes.GET_ASYMETRIC_PATH_START:
      return {
        ...state,
        isFetching: true,
      };

    case RouterActionTypes.GET_TOPOLOGY_SUCCESS:
      return {
        ...state,
        topology: action.payload,
        isFetching: false,
        error: null,
      };
    case RouterActionTypes.SEND_COMMAND_SUCCESS:
    case RouterActionTypes.SEND_OSPF_CONFIG_SUCCESS:
      return {
        ...state,
        command_result: action.payload,
        isFetching: false,
        error: null,
      };

    case RouterActionTypes.COMPARE_STATE_SUCCESS:
    case RouterActionTypes.GET_BACKUP_PATH_SUCCESS:
    case RouterActionTypes.ROUTER_SHUTDOWN_SUCCESS:
    case RouterActionTypes.GET_SHORTEST_PATH_SUCCESS:
    case RouterActionTypes.GET_ASYMETRIC_PATH_SUCCESS:
      return {
        ...state,
        topology_func_result: action.payload,
        isFetching: false,
        error: null,
      };

    case RouterActionTypes.GET_TOPOLOGY_FAILURE:
    case RouterActionTypes.SEND_COMMAND_FAILURE:
    case RouterActionTypes.SEND_OSPF_CONFIG_FAILURE:
    case RouterActionTypes.COMPARE_STATE_FAILURE:
    case RouterActionTypes.GET_BACKUP_PATH_FAILURE:
    case RouterActionTypes.ROUTER_SHUTDOWN_FAILURE:
    case RouterActionTypes.GET_SHORTEST_PATH_FAILURE:
    case RouterActionTypes.GET_ASYMETRIC_PATH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default routerReducer;
