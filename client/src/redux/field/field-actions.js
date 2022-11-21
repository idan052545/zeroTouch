import FieldActionTypes from "./field-types";

export const fetchSuccess = (fields) => ({
  type: FieldActionTypes.FETCH_SUCCESS,
  payload: fields,
});
export const fetchFailure = (error) => ({
  type: FieldActionTypes.FETCH_FAILURE,
  payload: error,
});

export const fetchStart = () => ({
  type: FieldActionTypes.FETCH_START,
});
