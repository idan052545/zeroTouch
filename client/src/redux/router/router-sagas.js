import { takeEvery, call, put, all } from "redux-saga/effects";

import {
  getTopologyFailure,
  getTopologySuccess,
  sendCommandSuccess,
  sendCommandFailure,
  sendOspfConfigSuccess,
  sendOspfConfigFailure,
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
      data = response.data;
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

    yield put(sendCommandSuccess(data.replace(/\\n/g, "\n")));
  } catch (error) {
    yield put(sendCommandFailure(error.message));
  }
}

export function* sendOspfConfigAsync({ payload }) {
  try {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8000/zero-touch/routers/send_ospf_config/",
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

    yield put(sendOspfConfigSuccess(data));
  } catch (error) {
    yield put(sendOspfConfigFailure(error.message));
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

export function* routerSagas() {
  yield all([
    call(onGetTopologyStart),
    call(onSendCommandStart),
    call(onSendOspfConfigStart),
  ]);
}
