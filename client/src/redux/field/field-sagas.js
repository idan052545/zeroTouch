import { takeEvery, call, put, all } from "redux-saga/effects";

import { fetchFailure, fetchSuccess } from "./field-actions";

import FieldActionTypes from "./field-types";

import axios from "axios";

export function* fetchFieldsAsync() {
  try {
    let config = {
      method: "get",
      url: "http://127.0.0.1:8000/zero-touch/fields/",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
    };

    let data;

    yield axios(config).then((response) => {
      data = response.data;
    });

    yield put(fetchSuccess(data));

    /*.catch((error) => {
        console.log(error);
      });*/
  } catch (error) {
    yield put(fetchFailure(error.message));
  }
}

export function* fetchFieldsStart() {
  yield takeEvery(FieldActionTypes.FETCH_START, fetchFieldsAsync);
}

export function* fieldSagas() {
  yield all([call(fetchFieldsStart)]);
}
