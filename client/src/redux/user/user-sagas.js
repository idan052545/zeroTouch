import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user-types";
import axios from "axios";

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

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    //get the user from the server
    //const userRef = yield call(createUserProfileDocument, userAuth);
    //const userSnapshot = yield userRef.get();
    const res = yield axios.get(`${API_URL}/new-image?query=${userAuth.IP}`);
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
