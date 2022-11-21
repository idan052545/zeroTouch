import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import fieldsReducer from "./field/field-reducer";

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "field"],
};

const rootReducer = combineReducers({
  field: fieldsReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
