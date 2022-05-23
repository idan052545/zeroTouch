import UserActionTypes from "./user-types";

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});
export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signInStart = (credentials) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: credentials,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const SignUpStart = (user) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: user,
});

export const signUpSuccess = (user) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});
export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const updateStart = (updatedUser) => ({
  type: UserActionTypes.UPDATE_START,
  payload: updatedUser,
});
export const updateSuccess = (updatedUser) => ({
  type: UserActionTypes.UPDATE_SUCCESS,
  payload: updatedUser,
});
export const updateFailure = (error) => ({
  type: UserActionTypes.UPDATE_FAILURE,
  payload: error,
});
