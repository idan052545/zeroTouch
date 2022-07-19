import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user-types";
import axios from "axios";
//import FormData from "form-data";

import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
  updateSuccess,
  updateFailure,
} from "./user-actions";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    //get the user from the server
    //const userRef = yield call(createUserProfileDocument, userAuth);
    //const userSnapshot = yield userRef.get();
    //process.env.DJANGO_AUTH_USERNAME ||
    //var FormData = require("form-data");
    /*let data = new FormData();
    data.append("ip", "1.2.5.4");

    const res = yield axios.get(`${API_URL}/zero-touch/api`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      auth: {
        username: "idan052545",
        password: "idan123456",
      },
      data: data,
    });*/
    const FormData = require("form-data");

    /*let data = new FormData();
    data.append("ip", userAuth.IP);
    console.log(data);*/
    const qs = require("qs");
    let data = qs.stringify({
      ip: "1.2.4.1",
    });
    console.log(data);
    let config = {
      method: "get",
      url: "http://127.0.0.1:8000/zero-touch/api",
      headers: {
        Authorization: "Basic aWRhbjA1MjU0NTppZGFuMTIzNDU2",
        "Content-Type": "application/json",
      },
      params: { ip: userAuth.IP },
      data: data,
    };

    const res = yield axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(res);
    yield put(signInSuccess({ id: userAuth.IP, ...userAuth }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}
//: { network, IP, siteNumber, numOfUsers }
export function* signInWithCredentials({ payload }) {
  try {
    //const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(payload);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    //get user from server
    /* const userAuth = yield getCurrentUser();
    if (!userAuth) return;*/
    // yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    //yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}
//: { network, IP, siteNumber, numOfUsers }
export function* signUp({ payload }) {
  try {
    //create the user at the server
    //const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // yield createUserProfileDocument(user, { displayName });
    yield put(signUpSuccess(payload));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}
export function* updateUser({ payload }) {
  try {
    //update the user at the server

    yield put(updateSuccess({ ...payload }));
  } catch (error) {
    yield put(updateFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInWithCredentials);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onUpdateStart() {
  yield takeLatest(UserActionTypes.UPDATE_START, updateUser);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onUpdateStart),
  ]);
}
