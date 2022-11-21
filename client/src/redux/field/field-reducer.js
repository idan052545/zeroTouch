import FieldActionTypes from "./field-types";

const INITIAL_STATE = {
  fields: null,
  isFetching: false,
  error: null,
};

const fieldsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FieldActionTypes.FETCH_START:
      return {
        ...state,
        isFetching: true,
      };

    case FieldActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        fields: action.payload,
        isFetching: false,
        error: null,
      };

    case FieldActionTypes.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default fieldsReducer;
