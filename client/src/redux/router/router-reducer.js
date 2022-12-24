import RouterActionTypes from "./router-types";

const INITIAL_STATE = {
  topology: null,
  command_result: null,
  isFetching: false,
  error: null,
};

const routerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RouterActionTypes.GET_TOPOLOGY_START:
    case RouterActionTypes.SEND_COMMAND_START:
    case RouterActionTypes.SEND_OSPF_CONFIG_START:
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

    case RouterActionTypes.GET_TOPOLOGY_FAILURE:
    case RouterActionTypes.SEND_COMMAND_FAILURE:
    case RouterActionTypes.SEND_OSPF_CONFIG_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default routerReducer;
