import { all, call } from "redux-saga/effects";
import { fieldSagas } from "./field/field-sagas";
import { userSagas } from "./user/user-sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(fieldSagas)]);
}
