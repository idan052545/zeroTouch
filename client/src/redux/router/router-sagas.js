import { takeEvery, call, put, all } from "redux-saga/effects";

import {
  getTopologyFailure,
  getTopologySuccess,
  sendCommandSuccess,
  sendCommandFailure,
  sendOspfConfigSuccess,
  sendOspfConfigFailure,
  getShortestPathSuccess,
  getBackupPathSuccess,
  getBackupPathFailure,
  getShortestPathFailure,
  routerShutdownSuccess,
  routerShutdownFailure,
  getAsymmetricPathSuccess,
  getAsymmetricPathFailure,
  compareStateSuccess,
  compareStateFailure,
} from "./router-actions";

import axios from "axios";
import RouterActionTypes from "./router-types";

export function* getTopologyAsync() {
  try {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8000/zero-touch/routers/generate_node_and_edge_dictionaries/",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
    };

    let data;

    yield axios(config).then((response) => {
      data = JSON.parse(response.data);
    });

    yield put(getTopologySuccess(data));
  } catch (error) {
    yield put(getTopologyFailure(error.message));
  }
}

export function* sendCommandAsync({ payload }) {
  try {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8000/zero-touch/routers/send_show_command/",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
      params: {
        ...payload,
      },
    };

    let data;

    yield axios(config).then((response) => {
      data = response.data;
    });

    yield put(
      sendCommandSuccess(
        data.replace(/\\n/g, "\n").replace(/\\t/g, "\t").slice(1, -1)
      )
    );
  } catch (error) {
    yield put(sendCommandFailure(error.message));
  }
}

export function* sendOspfConfigAsync({ payload }) {
  try {
    let config = {
      method: "post",
      url: "http://127.0.0.1:8000/zero-touch/routers/send_ospf_config/",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
      data: {
        ip: payload["ip"],
        config: payload["config"],
      },
    };

    let data;

    yield axios(config).then((response) => {
      data = response.data;
    });

    yield put(
      sendOspfConfigSuccess(
        data.replace(/\\n/g, "\n").replace(/\\t/g, "\t").slice(1, -1)
      )
    );
  } catch (error) {
    yield put(sendOspfConfigFailure(error.message));
  }
}

export function* getShortestPathAsync({ payload }) {
  try {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8000/zero-touch/routers/build_shortests_paths/",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
      params: { source: payload["source"], target: payload["target"] },
    };

    let data;

    yield axios(config).then((response) => {
      data = JSON.parse(response.data);
    });

    yield put(getShortestPathSuccess(data));
  } catch (error) {
    yield put(getShortestPathFailure(error.message));
  }
}

export function* getBackupPathAsync({ payload }) {
  try {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8000/zero-touch/routers/backup_paths_link_outage/",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
      params: { srcIP: payload["srcIPEdge"], trtIP: payload["trtIPEdge"] },
    };

    let data;

    yield axios(config).then((response) => {
      data = JSON.parse(response.data);
    });

    yield put(getBackupPathSuccess(data));
  } catch (error) {
    yield put(getBackupPathFailure(error.message));
  }
}

export function* getAsymmetricPathAsync() {
  try {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8000/zero-touch/routers/discover_asymmetric/",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
    };

    let data;

    yield axios(config).then((response) => {
      data = JSON.parse(response.data);
    });

    yield put(getAsymmetricPathSuccess(data));
  } catch (error) {
    yield put(getAsymmetricPathFailure(error.message));
  }
}

export function* routerShutdownAsync({ payload }) {
  try {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8000/zero-touch/routers/router_shutdown/",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
      params: { shutRouter: payload["shutRouter"] },
    };

    let data;

    yield axios(config).then((response) => {
      data = JSON.parse(response.data);
    });

    yield put(routerShutdownSuccess(data));
  } catch (error) {
    yield put(routerShutdownFailure(error.message));
  }
}

export function* compareStateAsync({ payload }) {
  try {
    let config = {
      method: "post",
      url: "http://127.0.0.1:8000/zero-touch/routers/check_diff/",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
      data: {
        topology: payload["currentTopology"],
      },
    };

    let data;

    yield axios(config).then((response) => {
      data = response.data;
    });

    yield put(compareStateSuccess());
  } catch (error) {
    yield put(compareStateFailure(error.message));
  }
}

export function* onGetTopologyStart() {
  yield takeEvery(RouterActionTypes.GET_TOPOLOGY_START, getTopologyAsync);
}

export function* onSendCommandStart() {
  yield takeEvery(RouterActionTypes.SEND_COMMAND_START, sendCommandAsync);
}

export function* onSendOspfConfigStart() {
  yield takeEvery(
    RouterActionTypes.SEND_OSPF_CONFIG_START,
    sendOspfConfigAsync
  );
}

export function* onGetShortestPathStart() {
  yield takeEvery(
    RouterActionTypes.GET_SHORTEST_PATH_START,
    getShortestPathAsync
  );
}

export function* onGetBackupPathStart() {
  yield takeEvery(RouterActionTypes.GET_BACKUP_PATH_START, getBackupPathAsync);
}

export function* onRouterShutdownStart() {
  yield takeEvery(RouterActionTypes.ROUTER_SHUTDOWN_START, routerShutdownAsync);
}

export function* onCompareStateStart() {
  yield takeEvery(RouterActionTypes.COMPARE_STATE_START, compareStateAsync);
}

export function* onGetAsymmetricPathStart() {
  yield takeEvery(
    RouterActionTypes.GET_ASYMETRIC_PATH_START,
    getAsymmetricPathAsync
  );
}

export function* routerSagas() {
  yield all([
    call(onGetTopologyStart),
    call(onSendCommandStart),
    call(onSendOspfConfigStart),
    call(onGetShortestPathStart),
    call(onGetBackupPathStart),
    call(onRouterShutdownStart),
    call(onCompareStateStart),
    call(onGetAsymmetricPathStart),
  ]);
}
